import React, {Component} from 'react';
import Config from '../Config.js';
import * as d3 from 'd3';


const firebase = require('firebase')
// var d3 = require('d3');


let movieIDs = [];


const data = {
    nodes: [
        {
            name: "Shu",
            group: 1
        },
        {
            name: "Yang",
            group: 2
        }
    ],
    links: [
        {
            source: 1,
            target: 0,
            value: 1 //don't need value but she's just showing it to us
        }
    ]
}

export class Graph extends Component{ 
  constructor(){
    super();
    this.state = {
        nodes: [],
        links: [],
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
      const width = 1920;
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

    //   const color = (node) => {
    //       if(node.group === 1)
    //         return d3.color("pink")
    //       return d3.color("blue")
    //   }

      const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodeObj)
        .join("circle")
        .attr("r", 20)
        .attr("fill", d3.color("steelblue"))

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

      return svg.node();
  }

componentDidMount(){
    //add movies to graphviz
    // if(!firebase.apps.length){
    //     firebase.initializeApp(Config);
    // }
    // let ref = firebase.database().ref('movieListPair');
    //     ref.on('value', snapshot => {
    //         const state = snapshot.val();
    //         for(let s in state){
    //             if(state[s].list === "GraphViz"){
    //                 movieIDs.push(state[s].movie);
    //             }
    //         }
    //     });
    // // console.log(movieIDs);
    // this.retrieveMovies();

    //read from graphviz and fill out state vars
    const elem = document.getElementById("mysvg");

    elem.appendChild(this.chart(data.nodes, data.links));
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
                        actor: state[s].actors
                    });
                }
            }
        });
    console.log(newMovie);
    this.setState({movies: newMovie});
    // console.log(this.state.movies);
    this.retrieveNodes(newMovie);
    this.retrieveNodes(newMovie);
  }

  retrieveNodes(){
    //stub
    // console.log(this.state.movies);
  }

  retrieveLinks(){
    //stub
  }

  render(){
    return (
        <div id="mysvg">

        </div>
    );
  }
}

export default Graph;