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
    render(){
      return (
        <div className='tab' 
        style={this.addStyling()}
        onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
            <h4>{this.props.tab.title}</h4>
        </div>
      );
  }
}

export default Tab;