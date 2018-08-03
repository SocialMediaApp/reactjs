import React, { Component } from 'react';
import AvatarComponent from './Avatar';
import { Link } from 'react-router-dom';

export class HeaderComponent extends Component {
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

  logout = () => {
    console.log('logout');
  }

  render () {
    return(
      <nav className="navbar has-shadow is-primary is-fixed-top" role="dropdown navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <p className="title has-text-white">SMA</p>
          </Link>
          <div
            className={'navbar-burger' + (this.state.navIsActive ? 'is-active' : '')}
            onClick={this.toggleNav}>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={'navbar-menu' + (this.state.navIsActive ? 'is-active': '')} 
          onClick={this.hideNav}>
          {/* todo if user && user.uid */}
          <div className="navbar-end">
            <Link className="navbar-item" to="/profile">
              <AvatarComponent />
              Tim Waite
            </Link>
            <a className="navbar-item">
              <span className="badge is-badge-danger" data-badge="2" onClick={this.openMessages}>
                Messages
              </span>
            </a>
            <a onClick={this.logout} className="navbar-item">
              Logout
            </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default HeaderComponent;