import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToPosts, like, dislike } from '../store/newsfeed';
import { AvatarComponent } from './Avatar';
import { distanceInWordsToNow } from 'date-fns';

function mapStateToProps(state) {
  return {
    posts: state.newsfeed.posts,
    user: state.auth.user
  }
}

export class PostsComponentPresenter extends Component {

  componentDidMount () {
    this.props.subscribeToPosts();
  }

  timeFromNow = timestamp => {
    return `${distanceInWordsToNow(timestamp.toDate())} ago`;
  }

  render () {
    let self = this;
    const postsList = this.props.posts.map( post => {

      function like() {
        self.props.like(post, self.props.user.uid);
      }

      function dislike () {
        self.props.dislike(post, self.props.user.uid);
      }

      return (
        <article className="media" key={post.id}>
          <figure className="media-left">
            <p className="image is-64x64">
             <AvatarComponent uid={post.userId} />
            </p>
          </figure>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{post.username}</strong> <small>{this.timeFromNow(post.createdAt)}</small>
                <br/>
                {post.text}
              </p>
            </div>
            <div className="level is-mobile">
              <div className="level-left">
                <a className="level-item" onClick={dislike}>
                  <span className={'icon ' + (post.dislikedBy.includes(this.props.user.uid) ? 'has-text-info' : '')}>
                    <i className="fa fa-thumbs-down"></i>
                  </span>
                </a>
                <a className="level-item" onClick={like}>
                  <span className={'icon ' + (post.likedBy.includes(this.props.user.uid) ? 'has-text-info' : '')}>
                    <i className="fa fa-thumbs-up"></i>
                  </span>
                </a>
                <small>Likes: {post.likes} </small>
              </div>
            </div>
          </div>
        </article>
      )
    })

    return (
      <React.Fragment>
        {postsList}
      </React.Fragment>
    );
  }
}

export const PostsComponent = connect(
  mapStateToProps,
  { subscribeToPosts, like, dislike }
)(PostsComponentPresenter);