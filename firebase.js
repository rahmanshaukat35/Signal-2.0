// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc4MIpeUOP-Jb8x1XV5OTl8JAs8wToiQI",
  authDomain: "signal-2-a26e8.firebaseapp.com",
  projectId: "signal-2-a26e8",
  storageBucket: "signal-2-a26e8.appspot.com",
  messagingSenderId: "239852128419",
  appId: "1:239852128419:web:52a30d5acd655f56f99716",
  measurementId: "G-4F2VH1R7RX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
