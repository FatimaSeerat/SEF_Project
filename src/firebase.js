// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWSMFVKWWMo1qBI3rF453uTOtwcSz1fuA",
  authDomain: "quizhub-ai.firebaseapp.com",
  projectId: "quizhub-ai",
  storageBucket: "quizhub-ai.appspot.com",  // correct bucket
  messagingSenderId: "615480227974",
  appId: "1:615480227974:web:42dd6c439cbbee60e2f907",
  measurementId: "G-VWHWQY0X6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);



export { app, analytics, auth, provider, db, storage };
