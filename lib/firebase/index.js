// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAiwS1xjOcjfYBM1LnP_A3H2KuSRJknrGY",
    authDomain: "budget-tracker-3a6ec.firebaseapp.com",
    projectId: "budget-tracker-3a6ec",
    storageBucket: "budget-tracker-3a6ec.appspot.com",
    messagingSenderId: "1014911560785",
    appId: "1:1014911560785:web:b4c5333f19161b025e9c70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }
