import React, {Component} from 'react';
import {SRLWrapper} from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox';
import Config from '../Config.js';


const firebase = require('firebase')


const options = {
    settings: {
        disableKeyboardControls: true,
        disableWheelControls: true,
    },
    buttons:{
        showAutoplayButton: false,
        showFullscreenButton: false,
        showNextButton: false,
        showPrevButton: false,
        showDownloadButton: false,
    },
    thumbnails:{
        showThumbnails: false,
    }
};

const callbacks = {
    onLightboxOpened: object => console.log(object)
};

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            shouldRender: true,
            shouldLoad: false
        }
    }
    
    componentDidMount(){
        if (!firebase.apps.length) {
          firebase.initializeApp(Config);
        } 
        let ref = firebase.database().ref('movie');
        //retrieve its data
        if(this.state.shouldRender){
            ref.on('value', snapshot => {
                const state = snapshot.val();
                // console.log("logging snapshot");
                // console.log(state);
                for(let s in state){
                    let newState = [];
                    // console.log("logging s");
                    // console.log(s);
                    // console.log("logging s's values");
                    // console.log(state[s]);
                    // console.log(state[s])
                    // newState.push({
                    //     // id: state[s].id,
                    //     // img: state[s].img,
                    //     // title: state[s].title,
                    //     // director:state[s].director,
                    //     // rating: state[s].rating
                    //     state[s]
                    // });
                    newState = state[s];
                    this.setState({movies: [...this.state.movies, newState]})

                }
                // this.setState({
                //     data: newState
                // });
            });
            this.setState({shouldLoad: true})
        }
        // console.log("loading state");
        // console.log(this.state);
    }

    // getRequest(id){
    //     const id1 = 'https://www.omdbapi.com/?i=';
    //     const id2 = '&apikey=915b3e92'
    //     const idCurrent = id1 + id + id2;
    //     console.log("logging current get request");
    //     axios.get(idCurrent)
    //     .then(response =>{
    //         console.log("successful call to api");
    //         const movie = {
    //             id,
    //             img: response.data.Poster,
    //             title: response.data.Title,
    //             director: response.data.Director,
    //             rating: response.data.imdbRating
    //         }
    //         this.setState({movies: [...this.state.movies, movie]})
    //     })
    //     .catch(function(error){
    //         console.log("unsuccessful call to api")
    //     })
    //     .then(function(){
    //         return;
    //     });
    // }

    dimPoster = (e) => {
        e.target.style.filter= 'brightness(40%)';
    }

    unDimPoster = (e) => {
        e.target.style.filter= 'brightness(100%)';
    }

    render(){
        // while(!this.state.shouldLoad){

        // }
        console.log("loading state");
        console.log(this.state);
        const Movies = this.state.movies && 
        this.state.movies.map(({id, img, title, director, rating}) => {
            return(
                <img className="child-grid" 
                onMouseEnter={this.dimPoster} 
                onMouseLeave={this.unDimPoster}
                src={img} alt={title + ' | ' + director + ' | ' + rating}>
                </img>
            )
        })
        const loaded = (
            <div className="parent-grid">
                <SimpleReactLightbox>
                <SRLWrapper options={options} callbacks={callbacks}>
                {Movies}
                </SRLWrapper>
                </SimpleReactLightbox>
            </div>
        );
        const unloaded = (<p>Loading movies...</p>)

        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;
