import React, {Component} from "react";

// export class Modal extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             show: false
//         }
//     }
    
//     render(){
//         const showHideClassName;
//         if(show){
//             showHideClassName = "modal display-block"
//         }else{
//             showHideClassName = "modal display-none"
//         }
//         return(
//             <div className={showHideClassname}>
//                 <section className="modal-main">
//                 {children}
//                 <button onClick={handleClose}>close</button>
//                 </section>
//             </div>
//         );
//     }
// }

const Modal = ({ handleClose, modalShow, children }) => {
    const showHideClassName = modalShow ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>close</button>
        </section>
      </div>
    );
  };

export default Modal;

