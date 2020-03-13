import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { RegistrationForm } from "./components/login/index";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Route path="/login" component={RegistrationForm} />
      </Router>
    )
  }
}
export default (App);
