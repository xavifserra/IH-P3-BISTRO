import React, { Component } from "react";
import { withAuth } from '../AuthProvider';
import { withDataPlaces } from '../PlacesProvider';
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
        <button className={classButtonShow} style={styleButtonShow} onClick={this.showModal}>
              <i className="material-icons">{textButtonShow}</i>
        </button>
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
