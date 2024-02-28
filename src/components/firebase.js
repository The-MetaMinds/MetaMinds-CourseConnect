// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR3uKe-JPqnV9SmHJEeMHabg42Vqx8E7I",
  authDomain: "metaminds2.firebaseapp.com",
  projectId: "metaminds2",
  storageBucket: "metaminds2.appspot.com",
  messagingSenderId: "29003604351",
  appId: "1:29003604351:web:3cac8891a6a08c3d1dfa4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}