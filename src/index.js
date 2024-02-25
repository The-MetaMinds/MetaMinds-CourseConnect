import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAda5XcH8NftOCf1r4OEnFhsUr2QzIYAaI",
  authDomain: "metaminds-42da4.firebaseapp.com",
  databaseURL: "https://metaminds-42da4-default-rtdb.firebaseio.com",
  projectId: "metaminds-42da4",
  storageBucket: "metaminds-42da4.appspot.com",
  messagingSenderId: "44971290973",
  appId: "1:44971290973:web:23c671b998d91d6873f8b4",
  measurementId: "G-9J0GESXVE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Sets Database
const database = getDatabase(app);



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






//Template Function for Registration to save to Databse

function registerUser() {
  var name = document.getElementsById('name').value
  var email = document.getElementsById('email').value
  var password = document.getElementsById('password').value

  database.ref('users/' + name).set({
    name : name,
    email : email,
    password : password,
  })
//This can be changed to "Successfully Registered!" but for now this is just a template.
  alert('Saved')

}




