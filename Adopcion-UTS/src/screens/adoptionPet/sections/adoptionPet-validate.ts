import * as Yup from "yup";

export interface AdoptionFormValues {
  nombreApellido: string;
  cedula: string;
  celular: string;
  direccion: string;
  profesion: string;
  motivoAdopcion: string;
  vivesCasaApartamento: string;
  permitenMascotas: boolean | null;
  mudanza: string;
  familiarAlergico: boolean | null;
  experienciasMascotas: boolean | null;
  quePasoConMascotasAnteriores: string;
  tieneOtrasMascotas: string;
  lugarDormirMascota: string;
  queHacesConMascotasEnViaje: string;
}

export const initialValues = (personalData?: Pick<AdoptionFormValues, "nombreApellido" | "cedula" | "celular">): AdoptionFormValues => ({
  nombreApellido: personalData?.nombreApellido || "",
  cedula: personalData?.cedula || "",
  celular: personalData?.celular || "",
  direccion: "",
  profesion: "",
  motivoAdopcion: "",
  vivesCasaApartamento: "",
  permitenMascotas: null,
  mudanza: "",
  familiarAlergico: null,
  experienciasMascotas: null,
  quePasoConMascotasAnteriores: "",
  tieneOtrasMascotas: "",
  lugarDormirMascota: "",
  queHacesConMascotasEnViaje: "",
});

export const validationSchema = Yup.object({
  nombreApellido: Yup.string().required("El nombre es obligatorio"),
  cedula: Yup.string().required("La cédula es obligatoria"),
  celular: Yup.string().required("El teléfono es obligatorio"),
  direccion: Yup.string().required("La dirección es obligatoria"),
  profesion: Yup.string().required("La profesión es obligatoria"),
  motivoAdopcion: Yup.string().required("El motivo de adopción es obligatorio"),
  vivesCasaApartamento: Yup.string().required("Selecciona una opción"),
  permitenMascotas: Yup.boolean().nullable().required("Selecciona una opción"),
  mudanza: Yup.string().required("Este campo es obligatorio"),
  familiarAlergico: Yup.boolean().nullable().required("Selecciona una opción"),
  experienciasMascotas: Yup.boolean()
    .nullable()
    .required("Selecciona una opción"),
  quePasoConMascotasAnteriores: Yup.string().required(
    "Este campo es obligatorio",
  ),
  tieneOtrasMascotas: Yup.string().required("Este campo es obligatorio"),
  lugarDormirMascota: Yup.string().required("Este campo es obligatorio"),
  queHacesConMascotasEnViaje: Yup.string().required(
    "Este campo es obligatorio",
  ),
});
