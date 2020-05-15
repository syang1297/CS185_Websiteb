import React, {Component} from 'react';

const axios = require('axios');

const movieID = [
    'tt6751668',
    'tt0332280',
    'tt0848228',
    'tt7784604',
    'tt0325980',
    'tt1396484',
    'tt0993846',
    'tt0120338'
];

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: []
        }
    }
    
    componentDidMount(){
        movieID.forEach(id => {
            this.getRequest(id)
        })
    }

    getRequest(id){
        const id1 = 'http://www.omdbapi.com/?i=';
        const id2 = '&apikey=915b3e92'
        const idCurrent = id1 + id + id2;
        console.log("logging current get request");
        axios.get(idCurrent)
        .then(response =>{
            console.log("successful call to api");
            // console.log(response)
            const movie = {
                id,
                img: response.data.Poster,
                title: response.data.Title,
                director: response.data.Director,
                rating: response.data.imdbRating
            }
            this.setState({movies: [...this.state.movies, movie]})
        })
        .catch(function(error){
            console.log("unsuccessful call to api")
        })
        .then(function(){
            return;
        });
    }

    render(){
        const Movies = this.state.movies && 
        this.state.movies.map(({id, img, title}) => {
            return(
                <img className="child-grid" src={img} alt={id}></img>
            )
        })
        const loaded = (
            <div className="parent-grid">
                {Movies}
            </div>
        );
        const unloaded = (<p>Loading movies...</p>)

        if(this.state.movies.length >= 8) return loaded
        return unloaded
  }
}

export default Movies;
