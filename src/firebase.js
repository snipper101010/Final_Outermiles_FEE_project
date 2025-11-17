import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_z-L51gcwvQunDDu44Np2EkgV1Ay-klQ",
    authDomain: "outermiles-56e50.firebaseapp.com",
    projectId: "outermiles-56e50",
    storageBucket: "outermiles-56e50.firebasestorage.app",
    messagingSenderId: "803529032988",
    appId: "1:803529032988:web:68d8492fe263f867b926d9",
    measurementId: "G-XC5LZDRRD6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
