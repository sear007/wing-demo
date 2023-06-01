import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAjcaIMc6tZkF40IRgUw6xPCe23uttliPc",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "wing-demo-58b3a.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "wing-demo-58b3a",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "wing-demo-58b3a.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "296111462600",
    appId: process.env.FIREBASE_APP_ID || "1:296111462600:web:a92ce500064761aca12dfd",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-JEDKTW0DYM",
};
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth(app);
export const db = firebase.firestore(app);