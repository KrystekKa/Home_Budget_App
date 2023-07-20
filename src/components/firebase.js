import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDj511XSb_P3L4-0atAgEBpCeAj7fNTAwI",
    authDomain: "homebudget-874d0.firebaseapp.com",
    databaseURL: "https://homebudget-874d0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "homebudget-874d0",
    storageBucket: "homebudget-874d0.appspot.com",
    messagingSenderId: "163705650859",
    appId: "1:163705650859:web:1499adf3d8c334d762c1ee",
    measurementId: "G-JBZKRGZZ1S"
};

const authStateChanged = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, database, ref, push, authStateChanged, onValue };