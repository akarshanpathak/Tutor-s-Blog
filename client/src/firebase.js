// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-fdaea.firebaseapp.com",
  projectId: "blog-fdaea",
  storageBucket: "blog-fdaea.appspot.com",
  messagingSenderId: "592317106333",
  appId: "1:592317106333:web:e64d7679df07b81965ec74"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);