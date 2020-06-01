import React, {Component} from 'react';
import Config from '../Config.js';

const firebase = require('firebase');

export class CreateList extends Component{ 
  constructor(){
    super();
    this.state = {
      list: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    if(!firebase.apps.length){
      firebase.initializeApp(Config);
    }
  } 

  handleChange(e){
    this.setState({
      list: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.list === ""){
      alert('Please enter new list name');
      return;
    }
    this.pushList();
  }

  pushList(){
    firebase.database().ref('list/' + this.state.list).set({
      title: this.state.list
    });
    alert("List added")
  }

  render(){
    return (
      <div>
        {/* <h2>Create List</h2> */}
        <div>Create new lists here</div>
        <input type="text" name="listName" placeholde="ex: Want to Watch" onChange={this.handleChange} value={this.state.list}/>
        <button className="submitBtn" onClick={this.handleSubmit}>Add New List</button>
      </div>
    );
  }
}

export default CreateList;