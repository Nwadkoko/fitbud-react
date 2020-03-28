import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export class ItemMealModalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: []
    }
  }

  retrieveItems = () => {
    var uid = firebaseApp.auth().currentUser.uid;  
    firebaseApp.database().ref(uid + "/items/").on("value", (snapshot) => {
      console.log(snapshot.val());
      this.setState({ items: this.state.items.push(snapshot.val())});
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    console.log(this.state.items);
  }

  render() {
    return (
      <div className="item-form-container">
          <Button onClick={this.retrieveItems}>Retrieve Items</Button>
      </div>
    );
  }
}

export default ItemMealModalList;
