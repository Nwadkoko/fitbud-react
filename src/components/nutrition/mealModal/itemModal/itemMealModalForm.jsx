import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export class ItemMealModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      glucides: 0,
      lipides: 0,
      proteines: 0
    };
  }

  itemChangeHandler = event => {
    this.setState({ item: event.target.value });
  }

  glucidesChangeHandler = event => {
    this.setState({ glucides: event.target.value }, () =>
      console.log(this.state.glucides)
    );
  }

  lipidesChangeHandler = event => {
    this.setState({ lipides: event.target.value }, () =>
      console.log(this.state.lipides)
    );
  }

  proteinesChangeHandler = event => {
    this.setState({ proteines: event.target.value }, () =>
      console.log(this.state.proteines)
    );
  }

  retrieveItems = () => {
    var uid = firebaseApp.auth().currentUser.uid;
    var items = [];
    firebaseApp.database().ref(uid + "/items/").on("value", function(snapshot) {
      console.log(snapshot.val());
      items.push(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    console.log(items);
  }

  render() {
    return (
      <div className="item-form-container">
        <Form>
          <Form.Group controlId="formBasicMealName">
            <Form.Label>Item name</Form.Label>
            <Form.Control type="meal" placeholder="Enter item name" onChange={this.itemChangeHandler}/>
          </Form.Group>
          <Form.Group controlId="formBasicItemGlucides">
            <Form.Label>Glucides</Form.Label>
            <Form.Control type="number" placeholder="Enter glucides" onChange={this.glucidesChangeHandler}/>
          </Form.Group>
          <Form.Group controlId="formBasicItemLipides">
            <Form.Label>Lipides</Form.Label>
            <Form.Control type="number" placeholder="Enter lipides" onChange={this.lipidesChangeHandler}/>
          </Form.Group>
          <Form.Group controlId="formBasicItemProteines">
            <Form.Label>Protéines</Form.Label>
            <Form.Control type="number" placeholder="Enter proteines" onChange={this.proteinesChangeHandler}/>
          </Form.Group>
          <Button variant="success" onClick={this.submitData}>
            * Save item
          </Button>
        </Form>
      </div>
    );
  }

  submitData = event => {
    event.preventDefault();
    console.log(this.state.meal);
    console.log("signed in");

    var uid = firebaseApp.auth().currentUser.uid;
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      firebaseApp
      .database()
      .ref(uid + "/items/" + this.state.item + "/glucides/")
      .set(this.state.glucides);

      firebaseApp
      .database()
      .ref(uid + "/items/" + this.state.item + "/lipides/")
      .set(this.state.lipides);

      firebaseApp
      .database()
      .ref(uid + "/items/" + this.state.item + "/proteines/")
      .set(this.state.proteines);
  };
}

export default ItemMealModalForm;
