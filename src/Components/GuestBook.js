import React, {Component} from 'react';
import Config from '../Config.js';
import Switch from "react-switch";
// import Alert from '@material-ui/lab/Alert';



// fix CSS for the guestForm and GuestMessages

const firebase = require('firebase')
const sample = ["hi", "hello", "how are you?"]

export class GuestBook extends Component{ 
    constructor(){
        super();
        this.state = {
            data: [],
            shouldRender: true,
            name: '',
            description: '',
            message: '',
            dropdown: '',
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
                // this.state.data = state;
                let newState = [];
                for(let s in state){
                    if(state[s].dropdown == "Yes"){
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
                // this.setState({
                //     data: state,
                //     shouldRender: !this.state.shouldRender
                // });
                this.setState({
                    data: newState
                });
            });
        }
    }

    //also include the other prop values?
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        console.log("submit btn pressed");
        var sub = 1;
        e.preventDefault();
        if(this.state.name == ""){
            // <Alert severity="error">Please fill out missing name information</Alert>
            alert('Please fill out missing name information');
            return;
            // sub = 0;
        }
        if(this.state.message == ""){
            // <Alert severity="error">Please fill out missing message information</Alert>
            alert('Please fill out missing message information');
            return;
            // sub = 0;

        }
        if(this.state.dropdown == ""){
            // <Alert severity="error">Please fill out missing dropdown information</Alert>
            alert('Please fill out missing dropdown information');
            return;
            // sub = 0;

        }
        // if(sub == 1){
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
                dropdown:'',
                email: '',
                time: ''
            });
            // <Alert severity="success">Message recorded!</Alert>
            alert('Message recorded');
        // }


    }

    render(){
    return (
        <div>
            <div className="guestTitle">Leave Me a Message!</div>   
            <div className="guestContainer">
                <div className="guestForm">
                    {/* <form className="guestForm"> */}
                    <div>What is your name?</div>
                        <input type="text" name="name" minLength="5" maxLength="20" placeholder="ex: John Smith" onChange={this.handleChange} value={this.state.name}/>
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
                    {/* </form> */}
                </div>
                <div className="guestMessages">
                          {this.state.data.map((msg) => {
                            return (
                            <div className="message">
                                <div className="messageHeader">
                                    <div className="messageName">{msg.name}  </div>
                                    <div className="messageDescription">  --  {msg.description}</div>
                                </div>
                                {/* <div className="message"> */}
                                {/* </div> */}
                                <div className="messageTime">{msg.time}</div>
                                <div className="messageMessage">{msg.message}</div>
                            </div>

                            )
                        })}
                </div>
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