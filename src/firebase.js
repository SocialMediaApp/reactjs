import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_URL}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_URL}.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_URL.toString(),
  storageBucket: `${process.env.REACT_APP_FIREBASE_URL}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const authProvider = firebase.auth.GoogleAuthProvider;

const settings = {timestampsInSnapshots: true};
db.settings(settings);
