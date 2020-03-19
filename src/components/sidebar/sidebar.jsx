import React from "react";
import "rsuite/dist/styles/rsuite-default.css";
import { Link } from "react-router-dom";
import { Sidenav, Dropdown, Nav, Icon } from "rsuite";
export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-sidebar">
        <div style={{ width: 250 }}>
          <Sidenav defaultOpenKeys={["3", "4"]} activeKey="1">
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" icon={<Icon icon="dashboard" />}>
                  <Link to="/">Home</Link>
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon icon="group" />}>
                  <Link to="/login">Login / Register</Link>
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<Icon icon="user-analysis" />}>
                  <Link to="/nutrition">Nutrition</Link>
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </div>
      </div>
    );
  }
}
