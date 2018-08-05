import { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToAuth } from '../store/auth';

export class AuthSubscriptionPresenter extends Component {

  componentWillMount () {
    this.props.subscribeToAuth();
  }

  // TODO show loading
  render () {
    return this.props.children;
  }
}

export const AuthSubscription = connect(
  null, 
  { subscribeToAuth }
)(AuthSubscriptionPresenter)