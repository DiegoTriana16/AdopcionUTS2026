import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd974KfX-Vo4oMTkoXe3hVgB5FpRrX8G4",
  authDomain: "adopcion-f8c4a.firebaseapp.com",
  projectId: "adopcion-f8c4a",
  storageBucket: "adopcion-f8c4a.firebasestorage.app",
  messagingSenderId: "970095794292",
  appId: "1:970095794292:web:2102e83e86f62df5169921",
};

const persistence = getReactNativePersistence(AsyncStorage);

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence,
});

export const db = getFirestore(app);
