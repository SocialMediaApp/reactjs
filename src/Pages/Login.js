import React, { Component } from 'react';
import { Redirect } from 'react-router';
import auth from '../services/auth';

export class LoginPage extends Component {
  googleSignIn = () => {
    auth.loginWithGoogle();
  }

  isAuthenticated = () => {
    return auth.isAuthenticated();
  }

  render() {
    if (this.isAuthenticated()) {
      return <Redirect to="/newsfeed" />
    } else {
      return (
        <section className="section">
          <div className="container is-fluid">
            <div className="field is-grouped">
              <div className="control">
                <button 
                  className="button is-primary"
                  onClick={this.googleSignIn}>
                  <span className="icon">
                    <i className="fa fa-google"></i>
                  </span>
                  <span>Sign in with Google</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )
    }
  }
}

export default LoginPage;