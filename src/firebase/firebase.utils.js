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

// QueryReference: is what get we by calling, e.g. firestore.doc('users/:userId)
// the queryReference does not have the actual data og the collection or document.
// It instead have properties that tell us details about it, or the method
// to get the Snapshot object which gives us the data we are looking for

// We use the documentRef objects to perform our CRUD methods (create, retrieve, update, delete).
// The documentRef methods are .set(), .get(), .update() and .delete() respectively.

// We can also add documents to collections using the collectionRef object using the .add() method
// //collectionRef.add({value: prop})

// We get the snapshotObject from the referenceObject using the .get() method. ie. documentRef.get()
// or collectionRef.get()

// documentRef returns a documentSnapshot object.
// collectionRef returns a querySnapshot object.

// userAuth is the object we get back from the google.auth when logging in
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // get queryReference
    const userRef = firestore.doc(`users/${userAuth.multiFactor.user.uid}`);

    // get data on the user document
    const snapShot = await userRef.get();

    // if user doesn't exist in database, then create one
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
