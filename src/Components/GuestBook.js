import React, {Component} from 'react';
import Config from '../Config.js';
import Switch from "react-switch";


// fix CSS for the guestForm and GuestMessages

const firebase = require('firebase')
const sample = ["hi", "hello", "how are you?"]

export class GuestBook extends Component{ 
    constructor(){
        super();
        this.state = {
            data: [],
            shouldRender: true
            // sample: 
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
            <div className="guestTitle">Leave Me a Message!</div>   
            <div className="guestContainer">
                <div className="guestForm">
                    {/* <form className="guestForm"> */}
                    <div>What is your name?</div>
                        <input type="text" name="name" placeholder="ex: John Smith"/>
                    <div>What is your desription?</div>
                        <input type="text" name="description" placeholder="ex: a friend"/>
                    <div>What is your message?</div>
                        <input type="text" name="message" placeholder="ex: Hello! Lovely website!"/>
                            {/* missing show message */}
                            {/* missing time */}
                    <div>What is your email?</div>
                        <input type="text" name="email" placeholder="ex:johnsmith@email.com"/>
                    <button className="submitBtn">Submit Message</button>
                    {/* </form> */}
                </div>
                <div className="guestMessages">Some Guest Messages wheee</div>
            </div>
        </div>
    );
  }
}

export default GuestBook;

// <h2>GuestBook</h2>
//         <div>GuesBook page</div>
//         {/* trying to test firebase rn */}
//          <p>{this.state.data}</p>
//         {sample.map((s, index) => (
//             <p>
//                 {s}
//             </p>
//         ))} 