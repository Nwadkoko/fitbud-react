import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import mealModalForm, { MealModalForm } from "./mealModalForm";

export class MealModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }


  handleClose = () => this.setState({showModal: false});
  handleShow = () => this.setState({showModal: true});

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Save a meal
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this.handleClose}
          animation={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MealModalForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary">
              Save meal
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save meal model
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MealModal;
