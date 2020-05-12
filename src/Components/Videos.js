import React, {Component} from 'react';

export class Videos extends Component{
  render(){
    return (
        <div class="parent-grid">
            <video class="child-grid"  controls>
                <source src={require("../Images/hk.mp4")} type="video/mp4"></source>
            </video>
            <iframe class="child-grid" width="560" height="315" src="https://www.youtube.com/embed/5qap5aO4i9A" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
            picture-in-picture" allowfullscreen title="lofi"></iframe>
        </div>
    );
  }
}

export default Videos;