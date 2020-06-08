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
    document.title = "Shu's Website";
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
      },
      {
        id: 6,
        title: "Movies"
      },
      {
        id: 7,
        title: "Add Movie"
      },
      {
        id: 8,
        title: "Create List"
      },
      {
        id: 9,
        title: "Graph"
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