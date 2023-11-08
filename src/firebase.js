import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyDBxARl_Sg_LJAQ7wj56Yu7c_lY8eW2fNE",
    authDomain: "otp-login-acaf9.firebaseapp.com",
    projectId: "otp-login-acaf9",
    storageBucket: "otp-login-acaf9.appspot.com",
    messagingSenderId: "710999392982",
    appId: "1:710999392982:web:cbd0fceb8c1fa0e3887f77",
    measurementId: "G-47WPJ6QS3F"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase