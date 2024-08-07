// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "kampus-bazaar.firebaseapp.com",
  projectId: "kampus-bazaar",
  storageBucket: "kampus-bazaar.appspot.com",
  messagingSenderId: "957001908062",
  appId: "1:957001908062:web:a66a291b9e48f07dbe59cf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);