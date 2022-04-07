import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB536KwSIx6MkLfXCdwcF_nkrTpD3Glkhc",
  authDomain: "thoth-9d722.firebaseapp.com",
  projectId: "thoth-9d722",
  storageBucket: "thoth-9d722.appspot.com",
  messagingSenderId: "1055814123136",
  appId: "1:1055814123136:web:08941d14713add9127b065",
  measurementId: "G-K6E6TDWYLB",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const store = getFirestore(firebaseApp);
