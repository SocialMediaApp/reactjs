import React, { Component } from 'react';
import { Redirect } from 'react-router';

export class LoginPage extends Component {
  render() {
    let isAuthenticated = true;
    if (isAuthenticated) {
      return <Redirect to="/newsfeed" />
    } else {
      return <h1>Login</h1>
    }
  }
}

export default LoginPage;