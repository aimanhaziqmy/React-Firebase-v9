import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAlDGHfRKdrbfQ9YKJzxK8ZzFQEvJDAl38",
  authDomain: "experiment-4420d.firebaseapp.com",
  projectId: "experiment-4420d",
  storageBucket: "experiment-4420d.appspot.com",
  messagingSenderId: "1057467056717",
  appId: "1:1057467056717:web:202a7afd42a028132a1204",
  measurementId: "G-RZ763BQQ3M",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
