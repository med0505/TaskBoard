// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBWYFse-sD1iRFTJ3SL9pyO5NLSuxxRfMI",
  authDomain: "taskboard-api-f85f5.firebaseapp.com",
  projectId: "taskboard-api-f85f5",
  storageBucket: "taskboard-api-f85f5.firebasestorage.app",
  messagingSenderId: "803069233345",
  appId: "1:803069233345:web:e0d24135cab58a9fee2c40"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {db}// usa para firebase database
export {auth} //usa para el login
