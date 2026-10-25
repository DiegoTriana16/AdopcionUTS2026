import { useAuth } from "@/contexts/AuthContext";
import { MascotaModel } from "@/models/Mascota-model";
import { useRouter } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useFormik } from "formik";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { db } from "../../../../firebase";
import {
  AdoptionFormValues,
  initialValues,
  validationSchema,
} from "../sections/adoptionPet-validate";

export function useAdoptionForm(pet: MascotaModel | null) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const formik = useFormik<AdoptionFormValues>({
    enableReinitialize: true,
    initialValues: initialValues({
      nombreApellido: profile?.nombre || "",
      cedula: profile?.cedula || "",
      celular: profile?.telefono || "",
    }),
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      if (!user || !profile || !pet) return;

      try {
        await addDoc(collection(db, "formularioAdopcion"), {
          ...values,
          uid: user.uid,
          fechaCreacion: new Date(),
          email: user.email || "",
          isValid: true,
          estado: "En estudio",
          mascota: pet,
        });

        resetForm({
          values: initialValues({
            nombreApellido: profile.nombre,
            cedula: profile.cedula,
            celular: profile.telefono,
          }),
        });

        Alert.alert(
          "¡Gracias por la solicitud!",
          "El formulario será revisado y podrás consultar su estado en la lista de formularios.",
          [
            {
              text: "Aceptar",
              onPress: () => router.replace("/drawer/adoption/home"),
            },
          ],
        );
      } catch (error) {
        console.error("Error al guardar formulario:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al guardar el formulario",
        });
      }
    },
  });

  const confirmarEnvio = () => {
    Alert.alert(
      "¡Advertencia!",
      "Una vez generado el formulario, no podrá ser modificado. ¿Está seguro de continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", onPress: () => formik.handleSubmit() },
      ],
    );
  };

  return {
    formik,
    confirmarEnvio,
    loading: loading || !profile,
    profile,
    user,
  };
}
