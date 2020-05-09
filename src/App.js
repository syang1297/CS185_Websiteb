import React, {Component} from 'react';
import Tablist from './Components/Tablist';
import Body from './Components/Body';
import Header from './Components/Header';
import ScrollUpButton from 'react-scroll-up-button';
import './App.css';

export class App extends Component{
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }

    this.changeTab = (id) =>{
      this.setState({
        activeTab: id
      })
    }
  }
  
  componentDidMount() {
    document.title = "Shu Yang";
  }

  render(){
    const tabs = [
      {
        id: 1,
        title: "Home"
      },
      {
        id: 2,
        title: "Images"
      },
      {
        id: 3,
        title: "Videos"
      },
      {
        id: 4,
        title: "Projects"
      },
      {
        id: 5,
        title: "Guest Book"
      }
    ]
    return (
      <div>
        <Header activeTab={this.state.activeTab}/>
      <div className="body">
        <ScrollUpButton
        StopPosition={0}
        ShowAtPosition={window.innerHeight/4}/>
        <div className="nav-bar">
          <Tablist tabs={tabs} 
          changeTab={this.changeTab}
          activeTab={this.state.activeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div>
      </div>
    );
  }
}

export default App;