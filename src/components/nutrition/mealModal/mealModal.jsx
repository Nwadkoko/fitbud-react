import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import mealModalForm, { MealModalForm } from "./mealModalForm";
import firebaseApp from "firebase";
import ItemMealModalForm from "./itemModal/itemMealModalForm";

export class MealModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showModal2: false,
      items: [],
      meal: ""
    };
  }

  callbackFunction = (childData, mealName) => {
    this.setState({ items: childData, meal: mealName });
  }

  handleClose = () => this.setState({showModal: false});
  handleShow = () => this.setState({showModal: true});
  handleClose2 = () => this.setState({showModal2: false});
  handleShow2= () => this.setState({showModal2: true});

  render() {
    return (
      <>
        <div className="buttons-container">
        <button onClick={this.handleShow} className="save-meal-modal">
          Save a meal
        </button>

        <button onClick={this.handleShow2} className="save-meal-modal">
          Save an item
        </button>
        </div>

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
        <Modal
          show={this.state.showModal2}
          onHide={this.handleClose2}
          animation={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ItemMealModalForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose2}>
              Close
            </Button>
            <Button variant="primary" >
              Save item
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
    firebaseApp
    .database()
    .ref(uid + "/meals/" + this.state.meal + "/name/")
    .set(this.state.meal);
  };
}

export default MealModal;
