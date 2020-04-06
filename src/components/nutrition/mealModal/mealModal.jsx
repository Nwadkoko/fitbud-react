import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import mealModalForm, { MealModalForm } from "./mealModalForm";
import firebaseApp from "firebase";

export class MealModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      items: [],
      meal: ""
    };
  }

  callbackFunction = (childData, mealName) => {
    this.setState({ items: childData, meal: mealName });
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
            <MealModalForm parentCallback={this.callbackFunction}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.submitData}>
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

  submitData = event => {
    event.preventDefault();
    console.log(this.state.meal);
    console.log("signed in");
    console.log(this.state.items)

    var uid = firebaseApp.auth().currentUser.uid;

    for(let i = 0; i < this.state.items.length; i++) {
      console.log(this.state.items[i]);
      firebaseApp
      .database()
      .ref(uid + "/meals/" + this.state.meal + "/items/" + i + "/")
      .set(this.state.items[i]);
    }
  };
}

export default MealModal;
