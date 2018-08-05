import { db } from '../firebase';

const SET_POSTS = 'SET_POSTS';

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    payload: {
      posts
    }
  }
}

const initialState = {
  posts: []
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case SET_POSTS:
      return {
        posts: action.payload.posts
      };
    default: return state;
  }
}

export function subscribeToPosts () {
  return dispatch => {
    return db.collection('posts').orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(post => Object.assign(post.data(), {id: post.id}));
        dispatch(setPosts(posts));
      });
  }
}

export function like (post, uid) {
  return () => {
    if (post.likedBy.includes(uid)) return
    let dislikedIndex = post.dislikedBy.indexOf(uid)
    if (dislikedIndex !== -1) {
      post.dislikedBy.splice(dislikedIndex, 1)
      post.likes++
    }
    post.likedBy.push(uid)
    post.likes++
    db.collection('posts').doc(post.id).set(post)
  }
}

export function dislike (post, uid) {
  return () => {
    if (post.dislikedBy.includes(uid)) return
    let likedIndex = post.likedBy.indexOf(uid)
    if (likedIndex !== -1) {
      post.likedBy.splice(likedIndex, 1)
      post.likes--
    }
    post.dislikedBy.push(uid)
    post.likes--
    db.collection('posts').doc(post.id).set(post)
  }
}

export function createTextPost (text, user) {
  return () => {
    return db.collection('posts').add({
      text: text,
      userId: user.uid,
      username: user.name,
      createdAt: new Date(),
      likes: 0,
      likedBy: [],
      dislikedBy: []
    })
  }
}