import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCsDX1uLSqA1k7A7_pL6EDU3zhN2iaMqqM",
  authDomain: "mymoneyexpenses.firebaseapp.com",
  projectId: "mymoneyexpenses",
  storageBucket: "mymoneyexpenses.appspot.com",
  messagingSenderId: "630078738732",
  appId: "1:630078738732:web:38ffceb4256aa46a605c89"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// initialize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, timestamp };