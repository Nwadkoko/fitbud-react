import React from "react";
import firebaseApp from "firebase";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ItemMealModalForm from "./itemMealModalForm";

export class MealModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 1,
      meal: "",
      calories: 0
    };
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

  /*
   <label htmlFor="meal-calories">Calories</label>
        <input
          type="number"
          name="meal-calories"
          onChange={this.caloriesChangeHandler}
        />
        <label htmlFor="meal-date">DateTime</label>
        <input type="datetime-local" name="meal-date" />
        <input type="submit" value="Submit!" onClick={this.submitData} />
        */

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicMealName">
          <Form.Label>Meal name</Form.Label>
          <Form.Control type="meal" placeholder="Enter meal name" />
        </Form.Group>
        {this.displainFormItem()}
        <Button variant="success" onClick={this.addFormItem.bind(this)}>+ Add item</Button>
      </Form>
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
      .ref(uid + "/meals/" + date + "/" + time + "/name")
      .set(this.state.meal);
    firebaseApp
      .database()
      .ref(uid + "/meals/" + date + "/" + time + "/calories")
      .set(this.state.calories);
  };
}

export default MealModalForm;
