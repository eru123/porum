import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Firebase Config
import config from "./config";

firebase.initializeApp(config);

export default firebase;

// String id = db.collection("collection_name").document().getId();
// db.collection("collection_name").document(id).set(object);
