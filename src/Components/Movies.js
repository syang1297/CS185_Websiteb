import React, {Component} from 'react';
import Config from '../Config.js';
import Modal from './Modal.js';


const firebase = require('firebase')

var currentModal = {
    img: '',
    title: '',
    director: '',
    rating: '',
    id: ''
}

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            shouldRender: true,
            shouldLoad: false,
            modalShow: false,
            refresh: false
        }
    }

    showModal = (e) => {
        this.setState({modalShow: true});
        const alt = e.target.alt;
        var altSplit = alt.split("|");
        var curr= {
            img: e.target.src,
            title: altSplit[0],
            director: altSplit[1],
            rating: altSplit[2],
            id: altSplit[3]
        }
        currentModal = curr;
    };
    
    hideModal = () => {
        this.setState({ modalShow: false });
    };

    
    deleteMovie = () => {
        var key = currentModal.id.trim();
        let ref = firebase.database().ref('movie/' + key);
        ref.remove()
        .then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
        this.setState({modalShow: false, movies: []}, this.retrieveMovies);
    };

    componentDidMount(){
        console.log("component did mount called");
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        let ref = firebase.database().ref('movie');
        //retrieve its data
        if(this.state.shouldRender){
            console.log("logging state in retrieveMovies()");
            console.log(this.state.movies);
            // this.setState({movies: []});
            ref.on('value', snapshot => {
                const state = snapshot.val();
                for(let s in state){
                    let newState = [];
                    newState = state[s];
                    this.setState({movies: [...this.state.movies, newState]});
                }
            });
            this.setState({shouldLoad: true})

        }
    }

    retrieveMovies(){
        console.log("retrieve movies called");
        
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        
        let ref = firebase.database().ref('movie');
        //retrieve its data
        if(this.state.shouldRender){
            // console.log("logging state in retrieveMovies()");
            // console.log(this.state.movies);
            // this.setState({movies: []});
            ref.on('value', snapshot => {
                const state = snapshot.val();
                for(let s in state){
                    let newState = [];
                    newState = state[s];
                    this.setState({movies: [...this.state.movies, newState]})
                }
            });
            this.setState({shouldLoad: true})

            // console.log("logging state at end of retrieve movies");
            // console.log(this.state.movies);
        }
        // this.setState({shouldLoad: true, shouldRender: false})

    }

    dimPoster = (e) => {
        e.target.style.filter= 'brightness(40%)';
    }

    unDimPoster = (e) => {
        e.target.style.filter= 'brightness(100%)';
    }

    render(){
        // this.retrieveMovies();
        console.log(this.state.movies);
        const Movies = this.state.movies && 
        this.state.movies.map(({id, img, title, director, rating}) => {
            return(
                <img className="child-grid"
                onMouseEnter={this.dimPoster} 
                onMouseLeave={this.unDimPoster}
                onClick={this.showModal}
                src={img} 
                alt={title + ' | ' + director + ' | ' + rating + ' | ' + id}>
                </img>
            )
        })
        const loaded = (
            <div className="parent-grid">
                {Movies}
                <Modal modalShow={this.state.modalShow} handleClose={this.hideModal} handleDelete={this.deleteMovie}>
                        <img src={currentModal.img} alt="movie poster"></img>
                        <p>{currentModal.title}</p>
                        <p>{currentModal.director}</p>
                        <p>{currentModal.rating}</p>
                </Modal>
            </div>
        );
        const unloaded = (<p>Loading movies...</p>)

        // return loaded;
        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;

