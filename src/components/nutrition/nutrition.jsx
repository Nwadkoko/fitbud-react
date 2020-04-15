import React from "react";
import MealModal from "./mealModal/mealModal";
import Meals from "./meals/meals";

export class Nutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: "",
      calories: 0
    };
  }
  
  render() {
    return (
      <div className="nutrition">
        <MealModal />
        <Meals />
      </div>
    );
  }
}
