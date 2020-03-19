import React from "react";
import firebaseApp from "firebase";
import { wait } from "@testing-library/react";

export class MealModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        meal: "",
        calories: 0
    };
  }

  mealChangeHandler = event => {
    this.setState({ meal: event.target.value });
  };

  caloriesChangeHandler = event => {
    this.setState({ calories: event.target.value }, () => console.log(this.state.calories));
  };

  render() {
    return (
      <form>
        <label htmlFor="meal-name">Meal</label>
        <input type="text" name="meal-name" onChange={this.mealChangeHandler} />
        <label htmlFor="meal-calories">Calories</label>
        <input
          type="number"
          name="meal-calories"
          onChange={this.caloriesChangeHandler}
        />
        <label htmlFor="meal-date">DateTime</label>
        <input type="datetime-local" name="meal-date" />
        <input type="submit" value="Submit!" onClick={this.submitData} />
      </form>
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
