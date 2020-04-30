import React, {Component} from 'react';

export class Home extends Component{
  render(){
    return (
      <div className="main-body">
        <div>
            <img src={require("../Images/aos.jpg")} height="250" width="225" alt="self"></img>
        </div>
        <div>
            <p className="bio">
                Welcome to my personal website! I'm a currently a 4th year computer science student 
                at the University of California, Santa Barbara. Other than coding, my other passions
                include urban dancing and spending time on the water. 
            </p>
        </div>
      </div>
    );
  }
}

export default Home;