import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDj511XSb_P3L4-0atAgEBpCeAj7fNTAwI",
    authDomain: "homebudget-874d0.firebaseapp.com",
    projectId: "homebudget-874d0",
    storageBucket: "homebudget-874d0.appspot.com",
    messagingSenderId: "163705650859",
    appId: "1:163705650859:web:1499adf3d8c334d762c1ee",
    measurementId: "G-JBZKRGZZ1S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged };