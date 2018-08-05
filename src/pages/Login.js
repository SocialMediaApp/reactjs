import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { loginWithGoogle } from '../store/auth';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export class LoginPagePresenter extends Component {
  googleSignIn = () => {
    this.props.loginWithGoogle();
  }

  render() {
    if (this.props.isAuthenticated) {
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

export const LoginPage = connect(
  mapStateToProps,
  { loginWithGoogle }
)(LoginPagePresenter);