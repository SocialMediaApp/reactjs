import React, { Component } from 'react';
import AvatarComponent from './Avatar';
import { Link } from 'react-router-dom';
import connect from '../../node_modules/react-redux/lib/connect/connect';
import { logout } from '../store/auth';

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export class HeaderComponentPresenter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      navIsActive: false
    };
  }

  toggleNav = () => {
    this.setState({
      navIsActive: !this.state.navIsActive
    });
  }

  hideNav = () => {
    this.setState({navIsActive: false});
  }

  openMessages = () => {
    console.log('open messages');
  }

  render () {
    let userOptions;

    if (this.props.user && this.props.user.uid) {
      userOptions = (<div className="navbar-end">
        <Link className="navbar-item" to="/profile">
          <AvatarComponent />
          {this.props.user.name}
        </Link>
        <a className="navbar-item">
          <span className="badge is-badge-danger" data-badge="2" onClick={this.openMessages}>
            Messages
          </span>
        </a>
        <a onClick={this.props.logout} className="navbar-item">
          Logout
        </a>
      </div>);
    }

    return(
      <nav className="navbar has-shadow is-primary" role="dropdown navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <p className="title has-text-white">SMA</p>
          </Link>
          <div
            className={'navbar-burger ' + (this.state.navIsActive ? 'is-active' : '')}
            onClick={this.toggleNav}>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={'navbar-menu ' + (this.state.navIsActive ? 'is-active': '')} 
          onClick={this.hideNav}>
          {userOptions}
        </div>
      </nav>
    )
  }
}

export const HeaderComponent = connect(
  mapStateToProps,
  { logout } 
)(HeaderComponentPresenter);