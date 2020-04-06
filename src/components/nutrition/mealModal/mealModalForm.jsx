import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ItemMealModalForm from "./itemModal/itemMealModalForm";
import ItemMealModalList from "./itemModal/itemMealModalList";

export class MealModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      meal: "",
      calories: 0,
      items : []
    };
  }

  callbackFunction = (childData) => {
    this.setState({ items: childData });
    this.props.parentCallback(this.state.items, this.state.meal);
  }

  addFormItem(){
      this.setState({count: this.state.count + 1});
  }

  displainFormItem(){
      let forms = [];
      for(let i = 0; i < this.state.count; i++){
          forms.push(
              <div key={i}>
                  <ItemMealModalForm />
              </div>
          )
      }
      return forms;
  }

  mealChangeHandler = event => {
    this.setState({ meal: event.target.value });
  };

  caloriesChangeHandler = event => {
    this.setState({ calories: event.target.value }, () =>
      console.log(this.state.calories)
    );
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicMealName">
          <Form.Label>Meal name</Form.Label>
          <Form.Control type="meal" placeholder="Enter meal name" onChange={this.mealChangeHandler}/>
        </Form.Group>
        <ItemMealModalList parentCallback={this.callbackFunction}/>
        {this.displainFormItem()}
        <Button variant="success" onClick={this.addFormItem.bind(this)}>+ Add item</Button>
      </Form>
    );
  }
}

export default MealModalForm;
