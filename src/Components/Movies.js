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
    id: '',
    list: []
}

var lists = [];

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            lists: [],
            shouldRender: true,
            shouldRenderList: true,
            shouldLoad: false,
            modalShow: false,
            refresh: false
        }
    }

    showModal = (e) => {
        this.setState({modalShow: true});
        const alt = e.target.alt;
        var altSplit = alt.split("|");
        var ID = altSplit[3];
        var l = this.retrieveMovieList(ID);
        var curr= {
            img: e.target.src,
            title: altSplit[0],
            director: altSplit[1],
            rating: altSplit[2],
            id: ID,
            list: l
        }
        currentModal = curr;
        console.log(currentModal);
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
        let ref1 = firebase.database().ref('list');
        // let list = [];
        if(this.state.shouldRenderList){
            ref1.on('value', snapshot =>{
                const lists = snapshot.val();
                let newList = [];
                newList.push("All");

                for(let l in lists){
                    newList.push(
                        lists[l].title
                    );
                }
                console.log("printing newList");
                console.log(newList);
                this.setState({lists: newList, shouldRenderList: false});
    
                // this.setState({lists: [...this.state.lists, lists]});
                // list.push(lists);
            });
        }
        // this.setState({lists: ["All"]});
        // let ref1 = firebase.database().ref('list');
        // ref1.on('value', snapshot=>{
        //     const lists = snapshot.val();
        //     console.log(lists);
        //     for(let l in lists){
        //         this.setState({lists: [...this.state.lists, l]});
        //     }
        // });
        this.retrieveList();
        // this.retrieveMovieList();
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
        // let list = [];
        if(this.state.shouldRenderList){
            ref1.on('value', snapshot =>{
                const lists = snapshot.val();
                let newList = [];
                newList.push("All");
                for(let l in lists){
                    newList.push(
                        lists[l].title
                    );
                }
                this.setState({lists: newList, shouldRenderList: false});
    
                // this.setState({lists: [...this.state.lists, lists]});
                // list.push(lists);
            });
        }

    }

    retrieveMovieList(id){
        // console.log("retrieveMovieList called");
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        let list = this.state.lists;
                console.log("printing list");
        console.log(list);
        if(typeof list === 'undefined' || id === null){
            return ["All"];
        }

        let ref = firebase.database().ref('movieListPair');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            for(let s in state){
                // console.log("printing s");
                // console.log(state[s].movie);
                console.log(state[s].movie);
                console.log(id);
                if(state[s].movie.trim() === id.trim()){

                    var toRemove = state[s].list;
                    var index = list.indexOf(toRemove);
                    if(index > -1 ){
                        list.splice(index, 1);
                    }
                }
            }
            var toRemove = "All";
            var index = list.indexOf(toRemove);
            if(index > -1){
                list.splice(index, 1);
            }
        });
        console.log("printing returning list");
        console.log(list);
        return list;
    }

    changeList(e){
        // alert("changeList clicked")
        console.log("list changing");
        console.log(e);
        console.log(e.value);
        //display all movies that have that movie list pair
    }

    addList(e){
        console.log("add list clicked");
        console.log(e);
        console.log(currentModal);
        firebase.database().ref('movieListPair/' + currentModal.id.trim() + '-' + e.value).set({
            movie: currentModal.id.trim(),
            list: e.value
        });
    }

    dimPoster = (e) => {
        e.target.style.filter= 'brightness(40%)';
    }

    unDimPoster = (e) => {
        e.target.style.filter= 'brightness(100%)';
    }

    render(){
        const unloaded = (<p>Loading movies...</p>)

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
        // const defaultOption = this.state.lists[0];
        if(!this.shouldRenderList){
            var movieList = [];
            var list = [];
            list = this.state.lists;
            console.log("loggings lists");
            console.log(list);
            var defaultOption = list[0];
            if(currentModal.id === null){
                // movieList.push("All");
                movieList = ["All"];
            }else{
                movieList = this.retrieveMovieList(currentModal.id);
                console.log("printing movielist");
                console.log(movieList);
            }
        }else{
            return unloaded;
        }
        
        const loaded = (
            <div>
                <Dropdown options={list} onChange={this.changeList} value={defaultOption} placeholder="All"/>
                {/* list.map(()) */}
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
                                    <Dropdown options={currentModal.list} onChange={this.addList} value={defaultOption} placeholder="All"/>
                                </div>
                            </div>

                    </Modal>
                </div>
            </div>
        );

        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;

