import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAV6BcXJQagrDmxL6D4C8_3OLzKXYV2VdM",
  authDomain: "oceansmart-aceea.firebaseapp.com",
  projectId: "oceansmart-aceea",
  storageBucket: "oceansmart-aceea.appspot.com",
  messagingSenderId: "943821557206",
  appId: "1:943821557206:web:bd1234567890abcdef1234"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firestore
const db = getFirestore(app);

export { db };
