import React, {Component} from 'react';
import '../App.css';

export class Tab extends Component{
    addStyling = () => {
        if(this.props.tab.id === this.props.activeTab){
            return {backgroundColor: 'rgba(150, 37, 80, 0.377)'}
        }else{
            return {backgroundColor: 'rgba(150, 37, 80, 0.74)'}
        }
    }
    highlight = (e) => {
        e.target.style.backgroundColor= 'rgba(150, 37, 80, 0.377)';
    }

    unHighlight = (e) => {
        if(this.props.tab.id !== this.props.activeTab){
            e.target.style.backgroundColor= 'rgba(150, 37, 80, 0.74)';
        }
    }
    
    render(){
      return (
        <div className='tab' 
        style={this.addStyling()}
        onClick={this.props.changeTab.bind(this, this.props.tab.id)}
        onMouseEnter={this.highlight}
        onMouseLeave={this.unHighlight}>
            <h4>{this.props.tab.title}</h4>
        </div>
      );
  }
}

export default Tab;