import React, {Component} from 'react';
import Config from '../Config.js';
import Modal from './Modal.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// TODO: movie delete and move show up right after adding
const firebase = require('firebase')

var currentModal = {
    img: '',
    title: '',
    director: '',
    rating: '',
    id: ''
}

var lists = [];

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            lists: [],
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
        this.setState({lists: ["All"]});
        let ref1 = firebase.database().ref('list');
        ref1.on('value', snapshot=>{
            const lists = snapshot.val();
            console.log(lists);
            for(let l in lists){
                this.setState({lists: [...this.state.lists, l]});
            }
        });
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

    retrieveList(){
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        let ref1 = firebase.database().ref('list');
        ref1.on('value', childSnapshot=>{
            const lists = childSnapshot.key;
            this.setState({lists: [...this.state.lists, lists]});
        });
    }

    changeList(e){
        alert("changeList clicked")
        console.log("list changing");
    }

    dimPoster = (e) => {
        e.target.style.filter= 'brightness(40%)';
    }

    unDimPoster = (e) => {
        e.target.style.filter= 'brightness(100%)';
    }

    render(){
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
        // this.retrieveList();
        console.log("logging lists");
        console.log(this.state.lists);
        const defaultOption = this.state.lists[0];
        const loaded = (
            <div>
                <Dropdown options={this.state.lists} onChange={this.changeList} value={defaultOption} placeholder="All"/>
                <div className="parent-grid">
                    {Movies}
                    <Modal modalShow={this.state.modalShow} handleClose={this.hideModal} handleDelete={this.deleteMovie}>
                            <div>
                                <div>
                                    <img src={currentModal.img} alt="movie poster"></img>
                                    <p>{currentModal.title}</p>
                                    <p>{currentModal.director}</p>
                                    <p>{currentModal.rating}</p>
                                </div>
                                <div>
                                    <p>Add to list:</p>
                                    <Dropdown options={this.state.lists} onChange={this.changeList} value={defaultOption} placeholder="All"/>
                                </div>
                            </div>

                    </Modal>
                </div>
            </div>
        );
        const unloaded = (<p>Loading movies...</p>)

        // return loaded;
        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;

