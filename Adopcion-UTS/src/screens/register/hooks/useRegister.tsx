import { getFirebaseAuthError } from "@/utils/error-firebase";
import { notificationError, notificationSuccess } from "@/utils/notification";
import { deleteUser } from "@firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { initialValues, validationSchema } from "../sections/register-validate";
import { createUser, createUserAuth, isCedulaAvailable, isEmailAvailable } from "../services/register-services";


export const useRegister = () => {
    const [showPassword, setShowPassword] = useState(false);

    const showHidenPassword = () => setShowPassword((prevState) => !prevState);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            let userCredential = null;

            const emailAvailable = await isEmailAvailable(formValue.email);
            const cedulaAvailable = await isCedulaAvailable(formValue.cedula);

            if (!emailAvailable) {
                notificationError("top", "Correo electrónico ya registrado.");
                return;
            }

            if (!cedulaAvailable) {
                notificationError("top", "Cédula ya registrada.");
                return;
            }

            console.log(formValue)

            try {
                userCredential = await createUserAuth(
                    formValue.email,
                    formValue.password,
                    formValue.nombre
                );


                await createUser(
                    userCredential.uid,
                    formValue.nombre,
                    formValue.cedula,
                    formValue.telefono,
                    "user"
                );

                formik.resetForm();

                notificationSuccess("top", "Usuario registrado correctamente.");


            } catch (error) {

                if (userCredential) {
                    try {
                        await deleteUser(userCredential);
                        console.log("Usuario de Auth eliminado");
                    } catch (deleteError) {
                        console.error(
                            "No se pudo eliminar el usuario de Auth:",
                            deleteError
                        );
                    }
                }


                const message = getFirebaseAuthError(error);
                notificationError("top", message);
                console.log("errorr", message);
            }
        },
    });

    return {
        formik,
        showPassword,
        showHidenPassword
    };
};