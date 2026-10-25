import { FirebaseError } from "firebase/app";

export const getFirebaseAuthError = (error: unknown): string => {
  if (!(error instanceof FirebaseError)) {
    return "Ocurrió un error inesperado.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "El correo electrónico ya está registrado.";

    case "auth/invalid-email":
      return "El correo electrónico no es válido.";

    case "auth/weak-password":
      return "La contraseña es demasiado débil.";

    case "auth/password-does-not-meet-requirements":
      return "La contraseña no cumple con los requisitos.";

    case "auth/user-not-found":
      return "No existe una cuenta con este correo.";

    case "auth/wrong-password":
      return "La contraseña es incorrecta.";

    case "auth/invalid-credential":
      return "El correo o la contraseña son incorrectos.";

    case "auth/user-disabled":
      return "Esta cuenta ha sido deshabilitada.";

    case "auth/too-many-requests":
      return "Demasiados intentos. Inténtalo nuevamente más tarde.";

    case "auth/network-request-failed":
      return "Error de conexión. Verifica tu conexión a internet.";

    default:
      console.log("Firebase Auth error:", error.code);
      return "Ocurrió un error al realizar la operación.";
  }
};
