import React from 'react';
import './modal.css'

const Modal = ({ handleClose, show, children, title }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="button-close"
          onClick={handleClose}
          >
          X
        </button>
        <center>
          <h4>{title}</h4>
        </center>
        {children}
      </section>
    </div>
  );
};
export default Modal;
