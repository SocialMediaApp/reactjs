import { storage } from '../firebase';

function getAvatarRef (uid) {
  let ref = storage.ref();
  return ref.child(`${uid}-avatar`);
}

export function uploadAvatar (uid, blob) {
  getAvatarRef(uid).put(blob).then(snapshot => {
    return snapshot;
  })
}

export function getAvatarUrl (uid) {
  return getAvatarRef(uid).getDownloadURL().catch(error => {
    console.error(error)
    return ''
  });
}