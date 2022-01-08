import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: 'AIzaSyBPNKqaGsdhx1LColsJo-DI0GKkm_Uz7bs',
    authDomain: 'crwn-database-cda07.firebaseapp.com',
    projectId: 'crwn-database-cda07',
    storageBucket: 'crwn-database-cda07.appspot.com',
    messagingSenderId: '51292091519',
    appId: '1:51292091519:web:4f1d9ca148e23e1630bb4a',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
