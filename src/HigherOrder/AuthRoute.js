import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

export class AuthRoute extends Component {
  render () {
    let isAuthenticated = true; //TODO: auth
    if (isAuthenticated) {
      return <Route {...this.props}/>
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default AuthRoute;