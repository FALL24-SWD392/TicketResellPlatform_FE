// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAioNZyIWNb2jbrY54Hhao9-CNraBsqvkI",
  authDomain: "ticket-resell-e100c.firebaseapp.com",
  projectId: "ticket-resell-e100c",
  storageBucket: "ticket-resell-e100c.appspot.com",
  messagingSenderId: "167286929492",
  appId: "1:167286929492:web:934a160689739065ed55c1",
  measurementId: "G-9R7EC10F4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDB = getStorage(app);