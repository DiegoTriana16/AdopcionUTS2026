import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const createUserAuth = async (
  email: string,
  password: string,
  nombre: string,
) => {
  console.log("auth", email, password, nombre);
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(user, {
    displayName: nombre,
  });

  return user;
};

export const createUser = async (
  id: string,
  nombre: string,
  cedula: string,
  telefono: string,
  rol: string,
) => {
  console.log("db", nombre, cedula, telefono, id);
  const firestore = getFirestore();
  const userRef = doc(firestore, "users", id);
  await setDoc(userRef, {
    nombre: nombre,
    cedula: cedula,
    telefono: telefono,
    rol: rol,
    photoURL: "",
  });
};

export const isEmailAvailable = async (email: string) => {
  const firestore = getFirestore();
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export const isCedulaAvailable = async (cedula: string) => {
  const firestore = getFirestore();
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("cedula", "==", cedula));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};
