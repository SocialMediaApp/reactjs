import { auth, db, authProvider } from '../firebase';

// Actions
const AUTHENTICATE = 'AUTHENTICATE';
const UNAUTHENTICATE = 'UNAUTHENTICATE';
const UPDATE_USER = 'UPDATE_USER';

export function authenticate(uid, name) {
  return {
    type: AUTHENTICATE,
    payload: {
      uid,
      name,
    },
  }
}

export function unathenticate() {
  return {
    type: UNAUTHENTICATE,
  }
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: {
      user
    }
  }
}

// State
const initialState = {
  user: {},
  isAuthenticated: true,
}

// Reducer
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case AUTHENTICATE:
      const { uid, name } = action.payload;
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
    case UPDATE_USER:
    const { user } = action.payload;
      return {
        user,
        isAuthenticated: true
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
    let provider = new authProvider();

    auth.signInWithPopup(provider).then(result => {
      db.collection('users').doc(result.user.uid).get().then(doc => {
        if (!doc.exists) {
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

export function updateCurrentUser (user) {
  return dispatch => {
    let data = {
      uid: user.uid,
      name: user.name
    }
    db.collection('users').doc(data.uid).update(data)
    dispatch(updateUser(data));
  }
}

export function logout () {
  return dispatch => {
    auth.signOut().then(() => {
      dispatch(unathenticate());
    }).catch(err => {
      // TODO: toasty
      console.error('unable to logout', err);
    })
  }
}