import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AvatarComponent } from './Avatar';
import { createTextPost } from '../store/newsfeed';

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export class NewPostComponentPresenter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  changeText = (event) => {
    this.setState({text: event.target.value})
  }

  submit = () => {
    this.props.createTextPost(this.state.text, this.props.user)
  }

  render() {
    return (
      <article className="media">
        <figure className="media-left">
          <p className="image is-64x64">
            <AvatarComponent uid={this.props.user.uid} />
          </p>
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" value={this.state.value} onChange={this.changeText}>
              </textarea>
            </p>
          </div>
          <div className="level">
            <div className="level-left"></div>
            <div className="level-right">
              <div className="level-item">
                <a className="button is-info" onClick={this.submit}>Submit</a>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export const NewPostComponent = connect(
  mapStateToProps,
  { createTextPost }
)(NewPostComponentPresenter);