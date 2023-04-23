// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJL6GfR7Nnd7CnW2mVk90k7eByHnau29w",
  authDomain: "firebasics-6cdb4.firebaseapp.com",
  projectId: "firebasics-6cdb4",
  storageBucket: "firebasics-6cdb4.appspot.com",
  messagingSenderId: "159403970685",
  appId: "1:159403970685:web:c0b3597306a4dac9ad2114",
  measurementId: "G-7YZJBLQ0CV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();