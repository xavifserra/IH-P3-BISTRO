import React, { Component } from "react";
import Modal from "./Modal";

class ModalForm extends Component {


  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };


  render() {
    const {title, children, classButtonShow, styleButtonShow, textButtonShow} = this.props
    return (
      <div>
        <div className={classButtonShow} style={styleButtonShow} onClick={this.showModal}>
              <i className="material-icons">{textButtonShow}</i>
        </div>
        <Modal
          title={title}
          show={this.state.show}
          handleClose={this.hideModal}
        >
          {children}
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
