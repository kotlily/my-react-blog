import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBRMCcVvs89vCyqWYhsn3b121atAA9BCco",
    authDomain: "my-react-blog-e4fdd.firebaseapp.com",
    projectId: "my-react-blog-e4fdd",
    storageBucket: "my-react-blog-e4fdd.appspot.com",
    messagingSenderId: "587506847742",
    appId: "1:587506847742:web:40021291a248a7430cbaaf"
};

const app = initializeApp(firebaseConfig);
app && console.log('Firebase initialized');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();