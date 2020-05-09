import React, {Component} from 'react';
import Config from '../Config.js';

const firebase = require('firebase')


export class GuestBook extends Component{ 
    constructor(){
        super();
        this.state = {
            data: [],
            shouldRender: true
        }
    }
    componentDidMount(){
        if (!firebase.apps.length) {
          firebase.initializeApp(Config);
        } 
        let ref = firebase.database().ref('data');
        //retrieve its data
        if(this.state.shouldRender){
            ref.on('value', snapshot => {
                const state = snapshot.val();
                // this.state.data = state;
                this.setState({
                    data: state,
                    shouldRender: !this.state.shouldRender
                });
            });
        }
    }

    render(){
    return (
      <div>
        <h2>GuestBook</h2>
        <div>GuesBook page</div>
        {/* trying to test firebase rn */}
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default GuestBook;