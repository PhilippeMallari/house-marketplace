import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6uREIBesBk63NY2fz63nIY6Fr6X6NvSg",
    authDomain: "house-marketplace-app-725a2.firebaseapp.com",
    projectId: "house-marketplace-app-725a2",
    storageBucket: "house-marketplace-app-725a2.appspot.com",
    messagingSenderId: "399285444323",
    appId: "1:399285444323:web:18beb21d07d92a5e536fd6"
};

//Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()