import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ItemMealModalUnit from "./itemMealModalUnit";

export class ItemMealModalList extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      times: 0
    }
  }
  
  handleClick = () => {
    this.setState({ times: this.state.times + 1})
  }

  removeAnItem = () => {
    this.setState({ times: this.state.times - 1})
  }

  displainUnitItem(){
    let forms = [];
    for(let i = 0; i < this.state.times; i++){
        forms.push(
            <div key={i}>
                <ItemMealModalUnit />
            </div>
        )
    }
    return forms;
}

  render() {
    return (
      <div className="item-form-container">
        {this.displainUnitItem()}
        <Button onClick={this.handleClick}>Add item to meal</Button>
        {this.state.times > 0 ? <Button onClick={this.removeAnItem}>Remove an item</Button> : null}
        
      </div>
    );
  }
}

export default ItemMealModalList;
