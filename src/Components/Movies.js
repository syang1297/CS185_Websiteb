import React, {Component} from 'react';
import {SRLWrapper} from "simple-react-lightbox";
import SimpleReactLightbox from 'simple-react-lightbox';
import Config from '../Config.js';
import ReactDOM from "react-dom";
// import Modal from './Modal.js';
import Modal from './Modal.js';

// import './Modal.js';



const firebase = require('firebase')


// const options = {
//     settings: {
//         disableKeyboardControls: true,
//         disableWheelControls: true,
//     },
//     buttons:{
//         showAutoplayButton: false,
//         showFullscreenButton: false,
//         showNextButton: false,
//         showPrevButton: false,
//         showDownloadButton: false,
//     },
//     thumbnails:{
//         showThumbnails: false,
//     }
// };

// const callbacks = {
//     onLightboxOpened: object => console.log(object)
// };

export class Movies extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            shouldRender: true,
            shouldLoad: false,
            modalShow: false
        }
    }

    showModal = () => {
        this.setState({ modalShow: true });
    };
    
      hideModal = () => {
        this.setState({ modalShow: false });
    };
    
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
                {/* <SimpleReactLightbox>
                <SRLWrapper options={options} callbacks={callbacks}> */}
                {Movies}
                <Modal modalShow={this.state.modalShow} handleClose={this.hideModal}>
                    <p>Modal</p>
                    <p>Data</p>
                </Modal>
                <button type="button" onClick={this.showModal}>open</button>
                {/* </SRLWrapper>
                </SimpleReactLightbox> */}
            </div>
        );
        const unloaded = (<p>Loading movies...</p>)

        if(this.state.shouldLoad) return loaded
        return unloaded
  }
}

export default Movies;
// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<Movies />, container);
