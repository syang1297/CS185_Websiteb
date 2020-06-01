import React from "react";

const Modal = ({ handleClose, modalShow, children, handleDelete }) => {
    const showHideClassName = modalShow ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <button onClick={handleClose}>Close</button>
          <button onClick={handleDelete}>Delete Movie</button>
        </section>
      </div>
    );
  };

export default Modal;

