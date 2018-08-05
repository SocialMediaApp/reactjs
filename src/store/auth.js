import firebase from 'firebase';

// Actions
const AUTHENTICATE = 'AUTHENTICATE';

export function authenticate(uid, name) {
  return {
    type: 'AUTHENTICATE',
    payload: {
      uid,
      name
    }
  }
}

// State
const initialState = {
  user: {},
  isAuthenticated: false
}

// Reducer
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE: 
      const { uid, name} = action.payload;
      return {
        user: {
          uid,
          name
        },
        isAuthenticated: true
      };
    default: return state;
  }
}

// Action Creators


// Side effects
export function loginWithGoogle () {
  return dispatch => {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      firebase.firestore().collection('users').doc(result.user.uid).get().then(doc => {
        if (!doc.exists) {
          this.create({
            uid: doc.uid,
            name: doc.displayName
          }).then(doc => {
            dispatch(authenticate(doc.uid, doc.displayName));
          });
        } else {
          dispatch(authenticate(doc.uid, doc.displayName));
        }
      });
    }).catch(error => {
      console.error(error)
    });
  }
}