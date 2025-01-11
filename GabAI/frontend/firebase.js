import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmEnVJ1Ub7rJ7F0GGE9G4BRT6w_NGygeM",
  authDomain: "finvue-e2d75.firebaseapp.com",
  projectId: "finvue-e2d75",
  storageBucket: "finvue-e2d75.appspot.com",
  messagingSenderId: "81250037484",
  appId: "1:81250037484:web:9721292dd0c2a2714f3fc9",
  measurementId: "G-5SP54QCGE2"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, storage, googleProvider, app as firebaseApp };