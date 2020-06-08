import React, {Component} from 'react';
import Config from '../Config.js';
import * as d3 from 'd3';

const firebase = require('firebase')
let movieIDs = [];

export class Graph extends Component{ 
  constructor(props){
    super(props);
    this.state = {
        Nodes: [],
        Links: [],
        movies: []
    }
    this.chart = this.chart.bind(this);
  }

  drag = (simulation) => {
      function dragStarted(d){
          if(!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
      }

      function dragged(d){
          d.fx = d3.event.x;
          d.fy = d3.event.y;
      }

      function dragEnded(d){
          if(!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
      }

      return d3.drag().on("start", dragStarted)
                        .on("drag", dragged)
                        .on("end", dragEnded)
  }

  chart(nodes, links){
      console.log("chart called");
      console.log(nodes);
      console.log(links);
      const width = 1980;
      const height = 1080;

      const linkObj = links.map(d => Object.create(d));
      const nodeObj = nodes.map(d => Object.create(d));

      const svg = d3.create("svg")
         .attr("viewBox", [0, 0, width, height]);

      const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(linkObj)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

      const color = (node) => {
          if(node.group === 1)
            return d3.color("pink")
          return d3.color("blue")
      }

      const radius = (node) => {
          if(node.group === 1)
            return 50;
          else
            return 100;
      }

      const simulation = d3.forceSimulation(nodeObj)
        .force("link", d3.forceLink().links(links).id(d=>{return d.index;}).distance(200))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width/2, height/2));

      simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
          node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
      });

      
      const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodeObj)
        .join("circle")
        .attr("r", radius)
        .attr("fill", color)
        .call(this.drag(simulation));

    //   console.log(link);
    //   console.log(node);
    //   console.log(svg.node());
      return svg.node();
  }

componentDidMount(){
    //add movies to graphviz
    if(!firebase.apps.length){
        firebase.initializeApp(Config);
    }
    let ref = firebase.database().ref('movieListPair');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            for(let s in state){
                if(state[s].list === "GraphViz"){
                    movieIDs.push(state[s].movie);
                }
            }
        });
    // console.log(movieIDs);
    var movs = this.retrieveMovies();
    let nodes = [];
    let links = [];

    // let movs = this.state.movies;
    // console.log("logging retrieved movies");
    // console.log(movs);

    for(let m in movs){
        // console.log("hello");
        // console.log("logging movs[m]");
        // console.log(movs[m]);
        // nodes.push(movs[m]);
        var mov = {
            title: movs[m].title,
            actors: movs[m].actor,
            img: movs[m].img,
            group: movs[m].group
        }
        nodes.push(mov);
        var actors = mov.actors;
        var list = actors.split(",");
        // console.log("here");
        for(let a in list){
            let actor = {group: 1, name: list[a].trim()}
            //check if actor already exists
            if(nodes.indexOf(actor) <= -1){
                nodes.push(actor);
            }
            //TODO: figure this out
            var link = {source: nodes.indexOf(mov),
                        target: nodes.map(function(n) {return n.name;}).indexOf(actor.name)}
            links.push(link);
        }
        // console.log("logging nodes");
        // console.log(nodes);
    }

    // console.log("logging after for loop");

    this.setState({
        Links: links,
        Nodes: nodes
    });

    // console.log("Logging in line 176");
    // console.log(links);
    // console.log(nodes);

    //read from graphviz and fill out state vars
    // const elem = document.getElementById("mysvg");
    // console.log("logging elem");
    // console.log(elem);
    // elem.appendChild(this.chart(this.state.nodes, this.state.links));
  }

  retrieveMovies(){
    var ref1 = firebase.database().ref('movie');
        let newMovie = [];
        ref1.on('value', snapshot => {
            const state = snapshot.val();
            for(let s in state){
                if(movieIDs.indexOf(state[s].id.trim()) > -1){
                    newMovie.push({
                        id: state[s].id,
                        img: state[s].img,
                        title: state[s].title,
                        actor: state[s].actors,
                        group: 0
                    });
                }
            }
        });
    return newMovie;
  }


  componentDidUpdate(){
      const elem = document.getElementById("mysvg");
      elem.appendChild(this.chart(this.state.Nodes, this.state.Links));
  }

  render(){
    return (
        <div>
            <div className= "graphBody">
                <div id="mysvg"></div>
            </div>
        </div>

    );
  }
}

export default Graph;