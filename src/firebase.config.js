// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auht";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK2uhVbnLyrkkS6MzTHpeMXCVuMaBUkzY",
  authDomain: "auth-react-firebasse-rrv6.firebaseapp.com",
  projectId: "auth-react-firebasse-rrv6",
  storageBucket: "auth-react-firebasse-rrv6.appspot.com",
  messagingSenderId: "1037557105096",
  appId: "1:1037557105096:web:7130072a4123ae9bb000fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);