import React, {Component} from 'react';
import Config from '../Config.js';

const firebase = require('firebase')
const axios = require('axios');
const d3 = require('d3');

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
        links: []
    }
  }

  chart(nodes, links){
      const width = 1920;
      const height = 1080;

      const linkObj = data.links.map(d => Object.create(d))

      const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

      return svg.node();
  }

  async componentDidMount(){
    //add movies to graphviz

    //read from graphviz and fill out state vars
    const elem = document.getElementById("mysvg");

    elem.appendChild(this.chart(data.nodes, data.links));
  }



  render(){
    return (
        <div id="mysvg"></div>
    );
  }
}

export default Graph;