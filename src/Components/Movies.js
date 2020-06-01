import React, {Component} from 'react';
import Config from '../Config.js';
import Modal from './Modal.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import List from './List.js';

const firebase = require('firebase')

var currentModal = {
    img: '',
    title: '',
    director: '',
    rating: '',
    id: '',
    list: [],
    search: []
}
var app = firebase.initializeApp(Config);


export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            lists: [],
            currentList: [],
            shouldRender: true,
            shouldRenderList: true,
            shouldLoad: false,
            modalShow: false,
            refresh: false
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
        this.retrieveAllMovies = this.retrieveAllMovies.bind(this);
        this.retrieveList = this.retrieveList.bind(this);
        this.retrieveMovieList = this.retrieveMovieList.bind(this);
        this.changeList = this.changeList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    
    componentDidMount(){
        console.log("component did mount called");
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        // let ref = firebase.database().ref('movie');
        this.retrieveAllMovies();
        this.setState({shouldLoad: true});
        let ref1 = firebase.database().ref('list');
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
                console.log("logging props.items");
                console.log(this.props.items)
                this.setState({lists: newList, search: this.props.items});
            });
    }

    componentWillReceiveProps(nextProps){
        this.setState({search: nextProps.items});
    }

    handleSearch(e) {
        let currentList = [];
        let newList = [];
        if (e.target.value !== "") {
            currentList = this.state.movies;
            console.log(currentList);
            newList = currentList.filter(item => {
                const lc = item.title.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
        newList = this.props.items;
        }
        this.setState({
            search: newList
        });
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
    
    showSearchModal = (e) =>{
        this.setState({modalShow: true});
        console.log(e);
        console.log(e.target);
        const movie = e.target;
        var l = this.retrieveMovieList(movie.id);
        var curr={
            img: movie.img,
            title: movie.title,
            director: movie.director,
            rating: movie.rating,
            id: movie.id,
            list: l
        }
        currentModal = curr;

    }

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
        var list = this.state.movie;
        console.log("logging currentModal");
        console.log(currentModal);
        // var toRemove = currentModal.id.trim();
        this.setState({movies: list, modalShow: false});
    };

    // pagination(){
    //     //begin pagination attempt
    //     if (!firebase.apps.length) {
    //         app = firebase.initializeApp(Config);
    //     } 
    //     var db = firebase.firestore(app);
    //     let docref = db.collection('movies')
    //     // var first = db.collection("movies")
    //     // .orderBy("id")
    //     // .limit(8);
    //     return docref.get().then(snapshot => {
    //     console.log(snapshot);
    //     let startAtSnapshot = db.collection('movies').orderBy('id').startAt(snapshot);
    //     return startAtSnapshot.limit(8).get();
    //     });
    // }

    //Get all movies
    retrieveAllMovies(){
        console.log("retrieve movies called");
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        
        let ref = firebase.database().ref('movie');
            let newMovie = [];
            ref.on('value', snapshot => {
                const state = snapshot.val();
                for(let s in state){
                    newMovie.push({
                        id: state[s].id,
                        img: state[s].img,
                        title: state[s].title,
                        director: state[s].director,
                        rating: state[s].rating
                    });
                }
            });
        this.setState({movies: newMovie});
    }

    //Makes list
    retrieveList(){
        if (!firebase.apps.length) {
            firebase.initializeApp(Config);
        } 
        let ref1 = firebase.database().ref('list');
        // if(this.state.shouldRenderList){
            ref1.on('value', snapshot =>{
                const lists = snapshot.val();
                let newList = [];
                newList.push("All");
                for(let l in lists){
                    newList.push(
                        lists[l].title
                    );
                }
                this.setState({lists: newList});
            });
        // }

    }

    //Returns dropdown in lightbox for the lists movie does NOT belong to
    retrieveMovieList(id){
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

    //Changes the movies displayed on the screen due to the list
    changeList(e){
        console.log("list changing to:");
        console.log(e);
        console.log(e.value);
        //display all movies that have that movie list pair
        if(e.value.trim() === "All"){
            this.retrieveAllMovies();
        }
        else{
            let newList = [];
            let newMovies = [];
            let ref = firebase.database().ref('movieListPair');
            ref.on('value', snapshot => {
                const state = snapshot.val();
                for(let s in state){
                    if(state[s].list.trim() === e.value.trim()){
                        newList.push(state[s].movie.trim());
                    }
                }
            });
            let ref1 = firebase.database().ref('movie');
            ref1.on('value', snapshot=>{
                const movie = snapshot.val();
                for(let m in movie){
                    if(newList.indexOf(movie[m].id.trim()) > -1){
                        newMovies.push({
                            id: movie[m].id,
                            img: movie[m].img,
                            director: movie[m].director,
                            title: movie[m].title,
                            rating: movie[m].rating
                        });
                    }
                }
                this.setState({
                    movies: newMovies
                });
            });
        }
    }

    //Adds movie to a list
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

        const Search = this.state.search &&
        this.state.search.map(({title}) => {
            return(
                <ul className="searchList">
                    {title}
                </ul>
            )
        })
        

        if(!this.shouldRenderList){
            var movieList = [];
            var list = [];
            list = this.state.lists;
            console.log("loggings lists");
            console.log(list);
            var defaultOption = "All";
        }else{
            return unloaded;
        }
        
        const loaded = (
            <div>
                <button className="submitBtn" onClick={this.retrieveAllMovies}>Show All Movies</button>
                <Dropdown options={list} onChange={this.changeList} value={defaultOption} placeholder="All"/>
                <div className="search">
                    <input type="text" className="input" onChange={this.handleSearch} placeholder="Search..." />
                    {Search}
                </div>
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




