import React, {Component} from 'react';
import Config from '../Config.js';

const firebase = require('firebase')


export class AddMovie extends Component{ 
  constructor(){
    super();
    this.state = {
      id: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(Config);
    } 
  }

handleChange(e) {
    this.setState({
      id: e.target.value
    });
}

  handleSubmit(e) {
    console.log("submit btn pressed");
    e.preventDefault();
    if(this.state.id === ""){
        alert('Please fill out movie id');
        return;
    }

    if(this.state.id.length !== 7){
      alert('Movie ids should be 7 numbers');
      return;
    }

    // console.log(this.state.id);
    const ref = firebase.database().ref('movie');
    const msg = {
        id: this.state.id
    }
    const id = this.state.id
    ref.push(msg);
    // ref.child(id).setValue(msg);
    this.setState({
        movie: ''
    });
    alert('Movie added');
  }

  render(){
    return (
      <div>
        {/* <h2>Add Movie</h2> */}
        <div>New movie IMDb ID (excluding tt): </div>
        {/* <div>TT</div> */}
        <input type="number" name="movieID" placeholder="ex: 1234567" onChange={this.handleChange} value={this.state.id}/>
        <button className="submitBtn" onClick={this.handleSubmit}>Add Movie</button>

      </div>
    );
  }
}

export default AddMovie;