import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export class AuthRoutePresentor extends Component {
  render () {
    if (this.props.isAuthenticated) {
      return <Route {...this.props}/>
    } else {
      return <Redirect to="/login" />
    }
  }
}

export const AuthRoute = connect(
  mapStateToProps
)(AuthRoutePresentor);