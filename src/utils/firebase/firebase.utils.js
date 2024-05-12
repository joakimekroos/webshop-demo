import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtHQ3n1eOeE3b0LFaey7jLah04bEOk9pI",
  authDomain: "crown-clothing-demo-3ef08.firebaseapp.com",
  projectId: "crown-clothing-demo-3ef08",
  storageBucket: "crown-clothing-demo-3ef08.appspot.com",
  messagingSenderId: "1031098099863",
  appId: "1:1031098099863:web:faade60b1656619f80e1d2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log('Error creating user: ', err.message);
    }

  }

  return userDocRef;
}