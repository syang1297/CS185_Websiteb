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

    // refreshPage(){
    //     window.location.reload(this.props.activeTab = 6);

    // }
    
    deleteMovie = () => {
        // console.log("logging id");
        // console.log(currentModal.id);
        var key = currentModal.id.trim();
        let ref = firebase.database().ref('movie/' + key);
        ref.remove()
        .then(function() {
            console.log("Remove succeeded.")
          })
          .catch(function(error) {
            console.log("Remove failed: " + error.message)
          });
        this.hideModal();
        // this.forceUpdate();
        // this.refreshPage();
        this.retrieveMovies();
        this.setState({shouldRender: true});
    };

    componentDidMount(){
        console.log("component did mount called");
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        this.retrieveMovies();

    }

    retrieveMovies(){
        console.log("retrieve movies called");
        
        let ref = firebase.database().ref('movie');
        //retrieve its data
        if(this.state.shouldRender){
            this.setState({movies: []});
            ref.on('value', snapshot => {
                const state = snapshot.val();
                for(let s in state){
                    let newState = [];
                    newState = state[s];
                    this.setState({movies: [...this.state.movies, newState]})
                }
            });
            this.setState({shouldLoad: true, shouldRender: false})
        }
    }

    dimPoster = (e) => {
        e.target.style.filter= 'brightness(40%)';
    }

    unDimPoster = (e) => {
        e.target.style.filter= 'brightness(100%)';
    }

    render(){
        // this.retrieveMovies();
        console.log("render called");
        console.log("logging current state");
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

        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;

