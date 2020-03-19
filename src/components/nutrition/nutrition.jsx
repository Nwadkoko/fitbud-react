import React from "react";
import MealModal from "./mealModal";

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
      </div>
    );
  }
}
