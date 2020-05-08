import React, {Component} from 'react';

export class Header extends Component{
    changeHeader = () =>{
        var activeTab = this.props.activeTab
        if(activeTab === 1){
            return "Welcome to Shu's Website"
        }else if (activeTab ===2){
            return "Images"
        }else if (activeTab === 3){
            return "Videos"
        } else if (activeTab === 4){
            return "Projects"
        } else if (activeTab === 5){
            return "GuestBook"
        }else{
            return "Page Not Found"
        }
    }
    render(){
        return(
            <div className='header'>
                <h1>{this.changeHeader()}</h1>
            </div>
        );
    }

}

export default Header;