"use client";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcjhpCtSbsm4iCDn0WVbBzLirWFFuAM54",
  authDomain: "gibraltar-game.firebaseapp.com",
  projectId: "gibraltar-game",
  storageBucket: "gibraltar-game.appspot.com",
  messagingSenderId: "886492071800",
  appId: "1:886492071800:web:54cc9c35d7a886b359ea8d"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
