import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "",
  authDomain: "teepee-db.firebaseapp.com",
  databaseURL: "https://teepee-db.firebaseio.com",
  projectId: "teepee-db",
  storageBucket: "teepee-db.appspot.com",
  messagingSenderId: "168799544960",
  appId: "1:168799544960:web:d7bba5b97de29db2a66865",
  measurementId: "G-QHRR8VX5C0"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;