import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "",
  authDomain: "teepee-db-1e2b9.firebaseapp.com",
  databaseURL: "https://teepee-db-1e2b9.firebaseio.com",
  projectId: "teepee-db-1e2b9",
  storageBucket: "teepee-db-1e2b9.appspot.com",
  messagingSenderId: "436165806702",
  appId: "1:436165806702:web:e6cfe23c37ba97d330347f",
  measurementId: "G-T5GV990VEP"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, aditionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get()
  console.log(snapShot.exists)

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt =  new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...aditionalData
      })
    } catch(err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async  (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  console.log(collectionRef);

  const batch =  firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const converCollectionsSnapshotToMap = (collections) => {
  const transformedCollections =  collections.docs.map(doc => {
    const { title, items } =  doc.data();
    return {
      routeName: encodeURI(title.toLocaleLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLocaleLowerCase()] = collection;
    return accumulator;
  },{})
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;