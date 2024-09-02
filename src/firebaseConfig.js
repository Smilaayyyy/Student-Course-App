// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, onSnapshot, updateDoc, query, where, arrayUnion } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB1rYGYffW-3FdgywrZ4Is-zpJmRLZgtFM",
  authDomain: "double-exchange-391808.firebaseapp.com",
  projectId: "double-exchange-391808",
  storageBucket: "double-exchange-391808.appspot.com",
  messagingSenderId: "340541297928",
  appId: "1:340541297928:web:41378133b83b3a20bf08bd",
  measurementId: "G-T7PGP4Z6DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, doc, getDoc , getDocs, setDoc, onSnapshot, updateDoc, query, where, arrayUnion};
