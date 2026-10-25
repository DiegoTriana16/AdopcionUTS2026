import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseAuthError } from "@/utils/error-firebase";
import { notificationError, notificationSuccess } from "@/utils/notification";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile } from "@firebase/auth";

import { SubirImagen } from "@/services/upload-mage";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import { Text } from "react-native";
import { db } from "../../../../firebase";
import { styles } from "../sections/profile-style";
import { validationSchema } from "../sections/profile-validate";

export const useProfile = () => {
  const { user, profile, refreshUser } = useAuth();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nombre: profile?.nombre || user?.displayName || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!user) return;

      try {
        let photoURL = user.photoURL;
        if (photoUri) {
          photoURL = await SubirImagen(photoUri, user.uid);
        }

        await updateProfile(user, { displayName: values.nombre, photoURL });
        await updateDoc(doc(db, "users", user.uid), {
          nombre: values.nombre,
          ...(photoURL ? { photoURL } : {}),
        });

        if (values.newPassword) {
          const credential = EmailAuthProvider.credential(user.email || "", values.currentPassword);
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, values.newPassword);
        }

        await refreshUser();
        setPhotoUri(null);
        formik.resetForm({ values: { nombre: values.nombre, currentPassword: "", newPassword: "", confirmPassword: "" } });
        notificationSuccess("top", "Perfil actualizado correctamente.");
      } catch (error) {
        notificationError("top", getFirebaseAuthError(error));
      }
    },
  });

  const selectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };


  const fieldError = (field: keyof typeof formik.values) =>
    formik.touched[field] && formik.errors[field] ? <Text style={styles.error}>{formik.errors[field]}</Text> : null;


  return {
    formik,
    fieldError,
    user,
    selectPhoto,
    photoUri
  };

};