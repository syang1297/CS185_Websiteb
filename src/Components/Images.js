import React, {Component} from 'react';
import "../App.css";
import SimpleReactLightbox from 'simple-react-lightbox';
import { SRLWrapper } from "simple-react-lightbox"; 


export class Images extends Component{
  render(){
    return (
        <div className="parent-grid">
            <SimpleReactLightbox>
            <SRLWrapper>
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
            </SRLWrapper>
            </SimpleReactLightbox>
        </div>
    );
  }
}

export default Images;