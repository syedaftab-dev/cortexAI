// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// i wrote this
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-7a87b.firebaseapp.com",
  projectId: "cortexai-7a87b",
  storageBucket: "cortexai-7a87b.firebasestorage.app",
  messagingSenderId: "1040424002676",
  appId: "1:1040424002676:web:25dac90ca75703e1a39d21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// i write this code

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()