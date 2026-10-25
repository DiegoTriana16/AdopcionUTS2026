import * as Yup from "yup";

export function initialValues() {
  return {
    nombre: "",
    edad: "",
    raza: "",
    ubicacion: "",
    genero: "masculino",
    descripcion: "",
    tipo: "",
    disponibilidad: "",
  };
}

export function validationSchema() {
  return Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    edad: Yup.string().required("El edad es obligatorio"),
    raza: Yup.string().required("El raza es obligatorio"),
    ubicacion: Yup.string().required("El ubicacion es obligatorio"),
    genero: Yup.string().required("El genero es obligatorio"),
    descripcion: Yup.string().required("El descripcion es obligatorio"),
  });
}
