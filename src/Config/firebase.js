// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDal9CmDAii8DVYLS0Fa3g0ZUzCdPtkSmg",
  authDomain: "hobby-hub-e36fc.firebaseapp.com",
  projectId: "hobby-hub-e36fc",
  storageBucket: "hobby-hub-e36fc.appspot.com",
  messagingSenderId: "44690823058",
  appId: "1:44690823058:web:05ea50fd49ac81cd4f534b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Initialize Firebase
