import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    telefono: "",
    email: "",
    password: "",
    cedula: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
      .email("El email no es correcto")
      .required("El email es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatorio")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    cedula: Yup.string()
      .matches(/^[0-9]+$/, "La cédula solo debe contener números")
      .required("La cédula es obligatoria"),
    telefono: Yup.string()
      .matches(/^[0-9]+$/, "La cédula solo debe contener números")
      .required("La cédula es obligatoria"),
  });
}
