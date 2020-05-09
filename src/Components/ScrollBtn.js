import React, {Component} from 'react';

export class ScrollBtn extends Component{
    constructor(){
        super();
        this.state = {
            visible: false
        }
    }
    componentDidMount() {
        var scrollComponent = this;
        document.addEventListener("scroll", function(e) {
          scrollComponent.makeVisible();
        });
      }

    makeVisible = () =>{
        if(window.pageYOffset > window.innerHeight/4){
            this.setState.visible = true;
            console.log("set visible = true");
        } else{
            this.setState.visible = false;
            console.log("set visible = false");
        }
    }

    scrollToTop = (e) =>{
        if(this.style.opacity === '1'){
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    
    render(){
        console.log("scrollBtn loaded")
        return(
            <div>
                {this.state.visible ? <div className="scrollBtn">Scroll to Top</div>: null} 
            </div>
        );
    }
}

export default ScrollBtn;