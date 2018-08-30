import React, { Component } from 'react';
import { getAvatarUrl } from '../services/avatar';

export class AvatarComponent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      avatar: '',
      loading: false
    }
  }

  getAvatar() {
    this.setState({loading: true});
    getAvatarUrl(this.props.uid).then(url => {
      this.setState({avatar: url});
    }).finally(() => this.setState({loading: false}));
  }

  componentDidMount () {
    this.getAvatar();
  }

  componentDidUpdate (prevProps) {
    if (this.props.uid !== prevProps.uid) {
      this.getAvatar();
    }
  }

  render() {
    if (this.state.loading) return null;
    else if (this.state.avatar) return <img className="avatar" src={this.state.avatar} alt="avatar"/>;
    else return <img src={`https://robohash.org/${this.props.uid}`} alt="avatar" />;
  }
}