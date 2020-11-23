const firestoreCreate = (firebase, collection, data) => {
  var db = firebase.firestore();
  var id = db
    .collection(collection)
    .doc()
    .getId();
  return db
    .collection(collection)
    .doc(id)
    .set(Object(data));
};

export default {
  firestoreCreate
};
