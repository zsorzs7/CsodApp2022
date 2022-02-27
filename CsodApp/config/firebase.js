import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

// add firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDlK1kLJ5zp-z9JnIpi7wRxVxBFg-I19pY",
  authDomain: "csodapp-2022.firebaseapp.com",
  projectId: "csodapp-2022",
  storageBucket: "csodapp-2022.appspot.com",
  messagingSenderId: "679442946290",
  appId: "1:679442946290:web:f938a9345ecc0346ad586b",
  measurementId: "G-QDH2NQGFWT",
};

// initialize firebase
initializeApp(firebaseConfig);

// initialize auth
const auth = getAuth();

export { auth };
