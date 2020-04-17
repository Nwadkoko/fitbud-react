import React from "react";
import firebaseApp from "firebase";
import { Button, Modal } from "react-bootstrap";
import MealView from "./mealView";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      items: [],
      renderView: false,
      itemsToModal: [],
      userId: "",
      loading: true,
    };
  }

  retrieveMeals = () => {
    var newArray = [];
    firebaseApp
      .database()
      .ref(this.state.userId + "/meals/")
      .on("value", (snapshot) => {
        newArray.push(snapshot.val());
      });
    this.setState({ meals: newArray }, () => {
      this.componentDidMount();
    });
  };

  componentDidMount() {
    this.authSubscription = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({
        userId: user.uid,
      });
      var itemsRef = firebaseApp.database().ref(this.state.userId + "/items/");
      itemsRef.once(
        "value",
        (snapshot) => {
          this.setState({
            items: snapshot.val(),
          });
        },
        (errorObject) => {
          console.log(errorObject);
        }
      );
      var newArray = [];
      var mealsRef = firebaseApp.database().ref(this.state.userId + "/meals/");
      mealsRef.once("value", (snapshot) => {
        newArray.push(snapshot.val());
        this.setState({
          meals: newArray,
          loading: false,
        });
      });
    });
  }

  callbackFunction = (toggleModal) => {
    this.setState({
      renderView: toggleModal,
    });
  };

  retrieveItem = (itemName) => {
    let newArray = [];
    firebaseApp
      .database()
      .ref(this.state.userId + "/items/")
      .on("value", (snapshot) => {
        newArray.push(snapshot.val());
      });
    this.setState({ items: newArray[0] }, () => {});
    console.log(newArray[0]);
  };

  handleClick = (item) => {
    console.log("handleclick item :" + item.name);
    console.log(Object.values(item));
    var newItems = [];
    var itemObject;
    item.items.forEach((item) => {
      console.log(this.state.items[item]);
      itemObject = this.state.items[item];
      itemObject.name = item;
      newItems.push(itemObject);
    });
    this.setState({
      renderView: true,
      itemsToModal: newItems,
    });
  };

  render() {
    let table = [];
    table.push(
      ...[
        <tr>
          <th>Meal</th>
          <th>Calories</th>
        </tr>,
      ]
    );
    console.log(this.state.loading);
    if (this.state.loading == false) {
      this.state.meals.forEach((element) => {
        let calories = 0;
        Object.values(element).forEach((items) => {
          table.push(
            ...[
              <th className="tg-0lax">
                <a href="#" onClick={() => this.handleClick(items)}>
                  {items.name}
                </a>
              </th>,
            ]
          );
          console.log(items);
          items.items.forEach((item) => {
            calories += this.state.items[item].calories;
            /*table.push(
              ...[
                  <td className="tg-0lax">{item}</td>
              ]
            );*/
          });
          table.push(...[<td className="tg-0lax">{calories}</td>]);
          calories = 0;
          table.push(...[<tr></tr>]);
        });
      });
    }

    return (
      <div className="wrapper">
        <table className="tg">{table}</table>
        <Button onClick={this.retrieveMeals}>XX</Button>
        <Button onClick={this.retrieveItem}>XXX</Button>
        {this.state.renderView ? (
          <MealView
            items={Object.values(this.state.itemsToModal)}
            parentCallback={this.callbackFunction}
          ></MealView>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default List;
