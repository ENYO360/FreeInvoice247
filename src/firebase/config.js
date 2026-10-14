// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv11Am1opemBrRnMPsDqJ6-0trB5fYhWA",
  authDomain: "freeinvoice247.firebaseapp.com",
  projectId: "freeinvoice247",
  storageBucket: "freeinvoice247.firebasestorage.app",
  messagingSenderId: "245988595475",
  appId: "1:245988595475:web:ef6cd7f14cf8a03d372ce6",
  measurementId: "G-LSPEFWBLZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);