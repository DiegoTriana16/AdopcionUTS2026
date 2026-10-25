import * as Yup from "yup";

export const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  currentPassword: Yup.string().when("newPassword", {
    is: (password: string) => Boolean(password),
    then: (schema) => schema.required("Ingresa tu contraseña actual"),
  }),
  newPassword: Yup.string().min(
    6,
    "La contraseña debe tener al menos 6 caracteres",
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "Las contraseñas no coinciden",
  ),
});
