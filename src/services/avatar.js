import { storage } from '../firebase';

let avatarPromises = {};

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
  if (!uid) return Promise.resolve('');
  if (avatarPromises[uid]) return avatarPromises[uid];
  const promise = getAvatarRef(uid).getDownloadURL();
  avatarPromises[uid] = promise;
  return promise;
}