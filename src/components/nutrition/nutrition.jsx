import React from "react";

import firebaseApp from "firebase";

export class Nutrition extends React.Component {
  constructor(props) {
    super(props);
    this.state = { meal: "" };
  }

  myChangeHandler = event => {
    this.setState({ meal: event.target.value });
  };

  render() {
    return (
      <div className="nutrition">
        <form onSubmit={this.myChangeHandler}>
          <input type="text" onChange={this.myChangeHandler} />
          <input type="submit" value="Submit!" onClick={this.submitData} />
        </form>
      </div>
    );
  }

  submitData = event => {
    event.preventDefault();
    console.log(this.state.meal);
    console.log("signed in");
    
    var uid = firebaseApp.auth().currentUser.uid;
    firebaseApp
      .database()
      .ref(uid + "/meals")
      .set(this.state.meal);
  };
}
