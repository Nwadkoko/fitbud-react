import React from "react";
import loginImg from "../../login.svg";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import firebaseApp from "../firebase/firebase";
import * as firebase from "firebase/app";

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="sign-in">
            <button type="button" className="vbtn">
              Login
            </button>
            <button className="vbtn" onClick={signInWithGoogle}>
              Sign in with Google
            </button>
          </div>
          <div className="sign-out">
            {user ? (
              <button className="vbtn" onClick={signOut}>
                Sign out
              </button>
            ) : (
              <div className="do-nothing"></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Login);
