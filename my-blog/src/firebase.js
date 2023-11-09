// src.firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFgOlR5m52VUTVYo858IHz0PawZvJwt6A",
  authDomain: "my-react-blog-e4fdd.firebaseapp.com",
  projectId: "my-react-blog-e4fdd",
  storageBucket: "my-react-blog-e4fdd.appspot.com",
  messagingSenderId: "587506847742",
  appId: "1:587506847742:web:40021291a248a7430cbaaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
