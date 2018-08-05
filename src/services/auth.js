import firebase from 'firebase';

export default {
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      // TODO create user in our db
      firebase.firestore().collection('users').doc(result.user.uid).get().then(doc => {
        if (!doc.exists) {
          this.create({
            uid: doc.uid,
            name: doc.displayName
          });
        }
      });
    }).catch(error => {
      console.error(error)
    });
  },
  isAuthenticated() {
    return true;
  }
}