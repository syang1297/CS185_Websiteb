import React, {Component} from 'react';
import Config from '../Config.js';

const firebase = require('firebase')
const axios = require('axios');


export class AddMovie extends Component{ 
  constructor(){
    super();
    this.state = {
      // key: '',
      id: '',
      img: '',
      title: '',
      director: '',
      rating: '',
      movie: []
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


  getRequest(id){
    const id1 = 'https://www.omdbapi.com/?i=';
    const id2 = '&apikey=915b3e92'
    const idCurrent = id1 + "tt" + id + id2;
    console.log("logging current get request");
    axios.get(idCurrent)
    .then(response =>{
        console.log("successful call to api");
        const mov = {
            // key: '', 
            id,
            img: response.data.Poster,
            title: response.data.Title,
            director: response.data.Director,
            rating: response.data.imdbRating
        }
        this.setState(mov, this.pushMovie);
        console.log("logging state in getResponse");
        console.log(this.state);
    })
    .catch(function(error){
        alert("movieId does not exist")
        console.log("unsuccessful call to api")
        return;
    })
    .then(function(){
        return;
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
    this.getRequest(this.state.id);
  }

  pushMovie(){
    const ref = firebase.database().ref('movie');
    
    console.log("logging this.state");
    console.log(this.state);
    // ref.push(this.state.movie);
    ref.push(this.state);
    console.log("logging this.state.movie");
    console.log(this.state.movie);
    // ref.child(id).setValue(msg);
    this.setState({
        // key: '',
        id: '',
        img: '',
        title: '',
        director: '',
        rating: '',
        movie: []
    });
    alert('Movie added');

  }

  render(){
    return (
      <div>
        <div>New movie IMDb ID (excluding tt): </div>
        <input type="number" name="movieID" placeholder="ex: 1234567" onChange={this.handleChange} value={this.state.id}/>
        <button className="submitBtn" onClick={this.handleSubmit}>Add Movie</button>
      </div>
    );
  }
}

export default AddMovie;