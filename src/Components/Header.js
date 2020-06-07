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
        }else if (activeTab === 4){
            return "Projects"
        }else if (activeTab === 5){
            return "Guest Book"
        }else if (activeTab === 6){
            return "Movies"
        }else if (activeTab === 7){
            return "Add Movie"
        }else if (activeTab === 8){
            return "Create List"
        }else if (activeTab === 9){
            return "Graph"
        }
        else{
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