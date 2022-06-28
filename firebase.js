import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCje7llodHpN1vesvvB8Gjh3nqssg35pFM",
  authDomain: "rn-instagram-clone-b2370.firebaseapp.com",
  projectId: "rn-instagram-clone-b2370",
  storageBucket: "rn-instagram-clone-b2370.appspot.com",
  messagingSenderId: "932961554752",
  appId: "1:932961554752:web:94b5b6c4ec1c592ba06aa5",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
