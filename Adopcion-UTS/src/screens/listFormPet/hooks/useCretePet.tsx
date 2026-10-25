import { SubirImagen } from "@/services/upload-mage";
import {
  notificationError,
  notificationSuccess,
  notificationWarning,
} from "@/utils/notification";
import * as ImagePicker from "expo-image-picker";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useFormik } from "formik";
import { useState } from "react";
import { db } from "../../../../firebase";
import {
  initialValues,
  validationSchema,
} from "../sections/createPet-validate";

interface FormularioValues {
  nombre: string;
  edad: string;
  raza: string;
  ubicacion: string;
  genero: string;
  descripcion: string;
  tipo: string;
  disponibilidad: string;
}

const useCreatePet = () => {
  const [image, setImage] = useState<string | null>(null);

  const formik = useFormik<FormularioValues>({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,

    onSubmit: async (formValue, { resetForm }) => {
      try {
        if (!image) {
          notificationWarning("top", "Debes seleccionar una imagen")
          return;
        }

        const mascotaRef = await addDoc(
          collection(db, "Animales"),
          {
            ...formValue,
            disponibilidad: "para adoptar",
            createdAt: new Date(),
            foto: "",
          }
        );

        const mascotaId = mascotaRef.id;
        const fotoUrl = await SubirImagen(image, mascotaId);

        await updateDoc(
          doc(db, "Animales", mascotaId),
          {
            foto: fotoUrl,
            id: mascotaId,
          }
        );

        resetForm();
        setImage(null);

        notificationSuccess(
          "top",
          "Mascota registrada correctamente."
        );
      } catch (error) {
        console.error("Error creando animal:", error);

        notificationError(
          "top",
          "No se pudo registrar la mascota."
        );
      }
    },
  });


  const CargarImagen = async (): Promise<void> => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  return {
    CargarImagen,
    image,
    formik,
  };
};

export default useCreatePet;