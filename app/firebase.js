// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcjhpCtSbsm4iCDn0WVbBzLirWFFuAM54",
  authDomain: "gibraltar-game.firebaseapp.com",
  projectId: "gibraltar-game",
  storageBucket: "gibraltar-game.appspot.com",
  messagingSenderId: "886492071800",
  appId: "1:886492071800:web:23ab0d9c11b046c459ea8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
