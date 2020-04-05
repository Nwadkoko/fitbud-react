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

  componentDidMount() {
      console.log("mounted")
  }

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
          <Form.Label>Items</Form.Label>
          <Form.Control as="select" onClick={this.retrieveItems} onChange={this.chooseChangeHandler}>
            {items}
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
}

export default ItemMealModalUnit;
