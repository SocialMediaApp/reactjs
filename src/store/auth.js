import { auth, db } from '../firebase';

// Actions
const AUTHENTICATE = 'AUTHENTICATE';
const UNAUTHENTICATE = 'UNAUTHENTICATE';

export function authenticate(uid, name) {
  return {
    type: AUTHENTICATE,
    payload: {
      uid,
      name
    }
  }
}

export function unathenticate() {
  return {
    type: UNAUTHENTICATE
  }
}

// State
const initialState = {
  user: {},
  isAuthenticated: true
}

// Reducer
export default function reducer (state = initialState, action = {}) {
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
    case UNAUTHENTICATE: 
      return {
        user: {},
        isAuthenticated: false
      }
    default: return state;
  }
}

// Side effects
export function subscribeToAuth () {
  return (dispatch, getState) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // we're signed in
        db.collection('users').doc(user.uid).get().then(doc => {
          dispatch(authenticate(doc.data().uid, doc.data().name));
        })
      } else {
        if (!getState().isAuthenticated) {
          dispatch(unathenticate());
        }
      }
    });
  }
}

export function loginWithGoogle () {
  return dispatch => {
    let provider = new auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      db.collection('users').doc(result.user.uid).get().then(doc => {
        if (!doc.exists) {
          debugger
          this.create({
            uid: result.uid,
            name: result.displayName
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

export function logout () {
  return dispatch => {
    auth.signOut().then(() => {
      dispatch(unathenticate());
    }).catch(err => {
      // TODO toasty
      console.error('unable to logout', err); 
    })
  }
}