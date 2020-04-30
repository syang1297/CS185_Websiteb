import React, {Component} from 'react';
import "../App.css";
// import Grid from '@material-ui/core/Grid';
// import { Grid } from '@material-ui/core';


// import ImageGrid from "./ImageGrid.js";

export class Images extends Component{
  render(){
    return (
        <div className="parent-grid">
            <img className="child-grid" alt="food" src={require("../Images/sushi.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/dangho.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/lihing.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/tacos.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/ramen.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/birite.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/bao.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/poki.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/halal.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/bbq.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/pizza.jpg")}></img>
            <img className="child-grid" alt="food" src={require("../Images/gnocchi.jpg")}></img>
        </div>
    );
  }
}

export default Images;