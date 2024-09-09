// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-31984.firebaseapp.com",
  projectId: "x-next-31984",
  storageBucket: "x-next-31984.appspot.com",
  messagingSenderId: "611992862270",
  appId: "1:611992862270:web:3ed5411c67ffb2bfef9b6f",
  measurementId: "G-QQ4DTT55MN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
