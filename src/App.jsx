import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { RegistrationForm } from "./components/login/index";

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <RegistrationForm />
  }
}
export default (App);
