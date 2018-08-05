import React, { Component } from 'react';
import { PostsComponent } from '../components/Posts';
import { NewPostComponent } from '../components/NewPost';

export class NewsfeedPage extends Component {
  render () {
    return (
      <div className="content">
        <div className="section">
          <NewPostComponent />
          <PostsComponent />
        </div>
      </div>
    )
  }
}

export default NewsfeedPage;