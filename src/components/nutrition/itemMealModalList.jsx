import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export class ItemMealModalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    console.log(" : mounted")
    this.retrieveItems();
  }

  retrieveItems = () => {
    var newArray = [];
    var uid = firebaseApp.auth().currentUser.uid;
    firebaseApp
      .database()
      .ref(uid + "/items/")
      .on("value", snapshot => {
        newArray.push(snapshot.val());
      });
    this.setState({
      items: newArray
    });
    console.log(this.state.items)
  };

  chooseChangeHandler = (event) => {
    console.log(event.target.value)
    console.log(Object.entries(this.state.items[0][event.target.value]))
  }
  

  render() {
      if(this.state.items.length > 0) {
      var items = Object.keys(this.state.items[0]).map(item => (
        <option key={item}>{item}</option>
      ))
      }
      /*Object.entries(item.map(sub_item => {
          console.log('sub_item', sub_item.glucides);
        }))*/
      /*var items = this.state.items[0].map(item => (
        <option key={item.glucides}>{item.glucides}</option>
      ));*/
    

    return (
      <div className="item-form-container">
        <Form.Group controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" onChange={this.chooseChangeHandler}>
            {items}
          </Form.Control>
        </Form.Group>
        <Button onClick={this.retrieveItems}>Retrieve</Button>
      </div>
    );
  }
}

export default ItemMealModalList;
