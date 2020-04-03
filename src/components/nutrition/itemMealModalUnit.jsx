import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export class ItemMealModalUnit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.retrieveItems()
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
    this.setState({ items: newArray}, () => {
      this.componentDidMount()
    })
  };

  chooseChangeHandler = (event) => {
    console.log(event.target.value)
    console.log(Object.entries(this.state.items[0][event.target.value]))
  }

  addItemToMeal() {
    if(this.state.items.length > 0) {
      var items = Object.keys(this.state.items[0]).map(item => (
        <option key={item}>{item}</option>
      ))
    }

    return(
      <Form.Group controlId="formGridState">
          <Form.Label>Items</Form.Label>
          <Form.Control as="select" onChange={this.chooseChangeHandler}>
            {items}
          </Form.Control>
      </Form.Group>
    )
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
          <Form.Label>Items</Form.Label>
          <Form.Control as="select" onChange={this.chooseChangeHandler}>
            {items}
          </Form.Control>
        </Form.Group>
        <Button onClick={this.retrieveItems} className="button-items">Retrieve</Button>
        <Button onClick={this.addItemToMeal}>Add item to meal</Button>
      </div>
    );
  }
}

export default ItemMealModalUnit;
