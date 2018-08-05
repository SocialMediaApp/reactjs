import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import auth from '../services/auth';

export class AuthRoute extends Component {
  render () {
    if (auth.isAuthenticated()) {
      return <Route {...this.props}/>
    } else {
      return <Redirect to="/login" />
    }
  }
}

export default AuthRoute;