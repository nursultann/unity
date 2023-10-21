// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM6-3tos6pOlN1NdGNBqDvdCb3IonTFIQ",
  authDomain: "unity-4c53f.firebaseapp.com",
  projectId: "unity-4c53f",
  storageBucket: "unity-4c53f.appspot.com",
  messagingSenderId: "247649350268",
  appId: "1:247649350268:web:b6b7b47bb9f3114c868ff9",
  measurementId: "G-427G70Q2HG"
};
const clientId = "363682799555-tt6kiha87aon6gpa6rvbg7nmq1a526nl.apps.googleusercontent.com";
const app = firebase.initializeApp(firebaseConfig);
const googleAuthProvider = firebase.auth.GoogleAuthProvider;
const auth = app.auth();
const analytics = app.analytics()

export { firebase, auth, clientId, googleAuthProvider, analytics };
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAM6-3tos6pOlN1NdGNBqDvdCb3IonTFIQ",
//   authDomain: "unity-4c53f.firebaseapp.com",
//   projectId: "unity-4c53f",
//   storageBucket: "unity-4c53f.appspot.com",
//   messagingSenderId: "247649350268",
//   appId: "1:247649350268:web:b6b7b47bb9f3114c868ff9",
//   measurementId: "G-427G70Q2HG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = app.auth();

// export {auth};