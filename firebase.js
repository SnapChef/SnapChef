// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ3Iz88q3_1SA-PR3stsNdrByiE8TwB5o",
  authDomain: "snapchef-ff3b4.firebaseapp.com",
  projectId: "snapchef-ff3b4",
  storageBucket: "snapchef-ff3b4.appspot.com",
  messagingSenderId: "980159440629",
  appId: "1:980159440629:web:02d30aec8407aa389747bc",
  measurementId: "G-89J90KJSZ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };