// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//aiChat Database
const firebaseConfig = {
  apiKey: "AIzaSyD-_T3L7uY1ifXs1yEEJnH_AdrDHKmm9B0",
  authDomain: "gabai-e2647.firebaseapp.com",
  projectId: "gabai-e2647",
  storageBucket: "gabai-e2647.firebasestorage.app",
  messagingSenderId: "638242672535",
  appId: "1:638242672535:web:5b0d6914dd902fb0f93ed2",
  measurementId: "G-QQGCM02R72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db } from "./firebaseCon";