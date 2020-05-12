import React, {Component} from 'react';
import Config from '../Config.js';
import { motion } from "framer-motion"


// import Switch from "react-switch";
// import Alert from '@material-ui/lab/Alert';



// fix CSS for the guestForm and GuestMessages

const firebase = require('firebase')

export class GuestBook extends Component{ 
    constructor(){
        super();
        this.state = {
            data: [],
            shouldRender: true,
            name: '',
            description: '',
            message: '',
            dropdown: 'No',
            email: '',
            time: ''
            // sample: 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                let newState = [];
                for(let s in state){
                    if(state[s].dropdown === "Yes"){
                        newState.push({
                            name: state[s].name,
                            description: state[s].description,
                            message: state[s].message,
                            dropdown:state[s].dropdown,
                            email: state[s].email,
                            time: state[s].time
                        });
                    }
                }
                this.setState({
                    data: newState
                });
            });
        }
    }

    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        console.log("submit btn pressed");
        e.preventDefault();
        if(this.state.name === ""){
            alert('Please fill out missing name information');
            return;
        }
        if(this.state.message === ""){
            alert('Please fill out missing message information');
            return;
        }
        if(this.state.dropdown === ""){
            alert('Please fill out missing dropdown information');
            return;
        }

        if(this.state.name.length < 5){
            alert('Name needs to be at least 5 characters long');
            return;
        }

        if(this.state.message.length < 15){
            alert('Message needs to be at least 15 characters long');
            return;
        }
        const ref = firebase.database().ref('data');
        const msg = {
            name: this.state.name,
            description: this.state.description,
            message: this.state.message,
            dropdown: this.state.dropdown,
            email: this.state.email,
            time: new Date().toLocaleString()
        }
        ref.push(msg);
        this.setState({
            name: '',
            description: '',
            message: '',
            dropdown:'No',
            email: '',
            time: ''
        });
        alert('Message recorded');
    }

    render(){
    return (
        <div>
            <div className="guestTitle">Leave Me a Message!</div>   
            <div className="guestContainer">
                <motion.div  animate={{rotate:360}} transition={{duration:2}} className="guestForm">
                    <div>What is your name?</div>
                        <input type="text" name="name" minLength="5" maxLength="20" pattern="{.5, 20}" placeholder="ex: John Smith" onChange={this.handleChange} value={this.state.name}/>
                    <div>What is your description?</div>
                        <input type="text" name="description" maxLength="100" placeholder="ex: a friend" onChange={this.handleChange} value={this.state.description}/>
                    <div>What is your message?</div>
                        <textarea type="paragraph_text" cols="50" rows="10" minLength="15" maxLength="500" name="message" placeholder="ex: Love the new website" onChange={this.handleChange} value={this.state.message}/>
                    <div>Would you like your message to show on the site?</div>
                        <select name="dropdown" onChange={this.handleChange} value={this.state.dropdown}>
                            <option value = "No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    <div>What is your email?</div>
                        <input type="text" name="email" placeholder="ex: johnsmith@email.com" onChange={this.handleChange} value={this.state.email}/>
                    <button className="submitBtn" onClick={this.handleSubmit}>Submit Message</button>
                </motion.div>
                <motion.div animate={{rotate:360}} transition={{duration:2}} className="guestMessages">
                          {this.state.data.map((msg) => {
                            return (
                            <motion.div     animate={{
                                scale: [1, 2, 2, 1, 1],
                                rotate: [0, 160, 270, 360, 0],
                              }}
                              className="message">
                                <div className="messageHeader">
                                    <div className="messageName">{msg.name}  </div>
                                    <div className="messageDescription">  --  {msg.description}</div>
                                </div>
                                <div className="messageTime">{msg.time}</div>
                                <div className="messageMessage">{msg.message}</div>
                            </motion.div>
                            )
                        })}
                </motion.div>
            </div>
        </div>
    );
  }
}

export default GuestBook;
