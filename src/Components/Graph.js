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
      const width = 1980;
      const height = 1080;

      const linkObj = links.map(d => Object.create(d));
      const nodeObj = nodes.map(d => Object.create(d));

      const svg = d3.create("svg")
         .attr("viewBox", [0, 0, width, height]);

    
        let defs = svg.append('svg:defs');
        let nodeMovie = [];
        let nodeActor = [];
        for(let n in nodes){
            if(nodes[n].group === 0){
                let nd = {
                    title: nodes[n].title.trim(),
                    actors: nodes[n].actors,
                    group:  nodes[n].group,
                    img: nodes[n].img.trim(),
                    id: nodes[n].id.trim()
                }
                nodeMovie.push(nd);
            }
            else{
                let a = {
                    group: nodes[n].group,
                    name: nodes[n].name.trim()
                }
            }
        }

        nodeMovie.forEach( node => {
            defs.append("svg:pattern").attr("id", node.id).attr("width", 1).attr("height", 1)
                .append("svg:image").attr("xlink:href", node.img).attr("width", 450).attr("height", 450).attr("x", -70).attr("y", 0);
        });

        //code for hover
        nodeActor.forEach(node=>{
            node.append("svg:title")
            .text(function(d){return d.name});
        })
        
        
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
        return 'url(#' + node.id + ')';
      }

      const radius = (node) => {
          if(node.group === 1)
            return 50;
          else
            return 100;
      }

      let tooltip = d3.select('body')
      .append('div')
      .style('z-index', '10')
      .style('position', 'absolute')
      .style('visibility', 'hidden')

      const simulation = d3.forceSimulation(nodeObj)
        .force("link", d3.forceLink().links(linkObj).id(d=>{return d.index;}).distance(200))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width/2, height/2));

        const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodeObj)
        .join("circle")
        .attr("r", radius)
        .attr("fill", color)
        .call(this.drag(simulation));

        node.on('mouseover', function(node){
            if(node.group === 1) {
              tooltip.text(node.name);
              tooltip.style('visibility', 'visible');
              tooltip.style('top', (d3.event.y-10)+'px').style('left',(d3.event.x+10)+'px');
            }
          })
            .on('mouseout', function(){
            return tooltip.style('visibility', 'hidden');
          });

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

      
      console.log("logging defs");
      console.log(defs);
      console.log(svg.defs);

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
    var movs = this.retrieveMovies();
    let nodes = [];
    let links = [];


    for(let m in movs){
        var mov = {
            title: movs[m].title,
            actors: movs[m].actor,
            img: movs[m].img,
            group: movs[m].group,
            id: movs[m].id
        }
        nodes.push(mov);
        var actors = mov.actors;
        console.log("logging actors");
        console.log(actors);
        var list = actors.split(",");
        for(let a in list){
            let actor = {group: 1, name: list[a].trim()}
            //check if actor already exists
            console.log("logging nodes");
            console.log(nodes);
            var actorsOnly = nodes.filter(no => no.group===1);
            
            if(nodes.indexOf(actor) <= -1){
                var pos = nodes.indexOf(actor);
                console.log("logging pos");
                console.log(pos);
                nodes.push(actor);
            }

            var targ = nodes.map(function(d) {return d.name;}).indexOf(actor.name);
            var link = {source: nodes.indexOf(mov),
                        target: targ}
            links.push(link);
        }
    }


    this.setState({
        Links: links,
        Nodes: nodes
    });
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