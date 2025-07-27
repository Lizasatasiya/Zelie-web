// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCmqTsUBdQMVZ57HvUqVn88cyydXtVuX0s",
    authDomain: "zelie-store.firebaseapp.com",
    projectId: "zelie-store",
    storageBucket: "zelie-store.firebasestorage.app",
    messagingSenderId: "178422708135",
    appId: "1:178422708135:web:863a6ed91e51c5c767e882",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
