import React, {Component} from 'react';


// h t tp : / /www. omdbapi . com/? api ke y =[ yourkey]& i=t t 0 1 6 7 2 6 1
//request using api
//https://www.ombdapi.com/?apikey=915b3e92&i=tt3896198
// http://www.omdbapi.com/?i=tt3896198&apikey=915b3e92
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

var movies = [];

// var testMovie = {
//     img: '',
//     title:'' ,
//     director:'' ,
//     rating: ''
// };

export class Movies extends Component{
    componentDidMount(){
        //COMMENTED OUT FOR NOW UNTIL GET REQUESTS ARE RIGHT
        for(let id in movieID){
            // console.log(id);
            this.getRequest(movieID[id]);
        }
        console.log(movies);
        // testMovie = axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=915b3e92')
        //     .then(function(response){
        //         console.log("successful call to api");
        //         console.log(response);
        //         testMovie.title = response.data.Title;
        //         testMovie.director = response.data.Director;
        //         testMovie.rating = response.data.imdbRating;
        //         console.log("logging testMovie");
        //         console.log(testMovie);
        //     })
        //     .catch(function(error){
        //         alert('Was unable to connect to the api')
        //         console.log("unsuccessful call to api")
        //     })
        //     .then(function(){
        //         //always executed
        //     });
    }

    getRequest(id){
        var id1 = 'http://www.omdbapi.com/?i=';
        var id2 = '&apikey=915b3e92'
        var idCurrent = id1 + id + id2;
        console.log("logging current get request");
        axios.get(idCurrent)
        .then(function(response){
            console.log("successful call to api");
            // console.log(response)
            movies.push({
                img: '',
                title: response.data.Title,
                director: response.data.Director,
                rating: response.data.imdbRating
            });
            // console.log(movies);
        })
        .catch(function(error){
            alert('Was unable to connect to the api')
            console.log("unsuccessful call to api")
        })
        .then(function(){
            return;
        });
    }

    render(){
    return( 
        <div className="parent-grid">
            HELLO WORLD
        </div>
    );
  }
}

export default Movies;

//mapping for later
// movies.map((movie) => {
//     return(
//         <div className="child-grid">
//             {/* <img>{movie.img}</img> */}
//             {testMovie}
//         </div>
//     )
// })