import React, {Component} from 'react';
import {SRLWrapper} from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox';
import Config from '../Config.js';
import Modal from './Modal.js';


const firebase = require('firebase')

var currentModal = {
    img: '',
    title: '',
    director: '',
    rating: ''
}

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            shouldRender: true,
            shouldLoad: false,
            modalShow: false,
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
            rating: altSplit[2]
            // key: 
        }

        currentModal = curr;
    };
    
    hideModal = () => {
        this.setState({ modalShow: false });
    };
    
    deleteMovie(e){
        console.log("delete movie called");
        console.log("logging e");
        console.log(e.target);
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
                for(let s in state){
                    let newState = [];
                    newState = state[s];
                    console.log("logging key");
                    console.log(s.key);
                    this.setState({movies: [...this.state.movies, newState]})
                }
            });
            this.setState({shouldLoad: true})
        }
    }

    dimPoster = (e) => {
        e.target.style.filter= 'brightness(40%)';
    }

    unDimPoster = (e) => {
        e.target.style.filter= 'brightness(100%)';
    }

    render(){
        const Movies = this.state.movies && 
        this.state.movies.map(({id, img, title, director, rating}) => {
            return(
                <img className="child-grid"
                onMouseEnter={this.dimPoster} 
                onMouseLeave={this.unDimPoster}
                onClick={this.showModal}
                src={img} 
                alt={title + ' | ' + director + ' | ' + rating}>
                </img>
            )
        })
        const loaded = (
            <div className="parent-grid">
                {Movies}
                <Modal modalShow={this.state.modalShow} handleClose={this.hideModal} deleteMovie={this.deleteMovie}>
                        <img src={currentModal.img}></img>
                        <p>{currentModal.title}</p>
                        <p>{currentModal.director}</p>
                        <p>{currentModal.rating}</p>
                </Modal>
            </div>
        );
        const unloaded = (<p>Loading movies...</p>)

        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;

