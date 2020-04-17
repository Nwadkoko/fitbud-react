import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export class MealView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    };
  }

  handleClose = () => {
    this.props.parentCallback(false);
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.props.items);
    let meal = [
      <tr>
        <th>Item name</th>
        <th>Calories</th>
        <th>Glucides</th>
        <th>Lipides</th>
        <th>Proteines</th>
      </tr>,
    ];
    this.props.items.forEach((item) => {
      console.log("modal item : " + item.name);
      meal.push(
        ...[
          <>
            <tr>
              <td className="tg-0lax">{item.name}</td>
              <td className="tg-0lax">{item.calories}</td>
              <td className="tg-0lax">{item.glucides}</td>
              <td className="tg-0lax">{item.lipides}</td>
              <td className="tg-0lax">{item.proteines}</td>
            </tr>
          </>,
        ]
      );
    });
    return (
      <>
        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={this.handleClose}
          animation={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Meal</Modal.Title>
          </Modal.Header>
          <Modal.Body>{meal}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.submitData}>
              Save meal
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save meal model
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MealView;
