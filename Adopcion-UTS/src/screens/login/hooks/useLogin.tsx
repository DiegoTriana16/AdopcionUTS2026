import { useAuth } from "@/contexts/AuthContext";
import { notificationError } from "@/utils/notification";
import { useFormik } from "formik";
import { useState } from "react";
import { initialValues, validationSchema } from "../sections/login-validate";


export const useLogin = (goToHome: () => void) => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const showHidenPassword = () => setShowPassword((prevState) => !prevState);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                login(formValue.email, formValue.password);
                goToHome();
            } catch (error) {
                notificationError("top", "Credenciales no validas");
                console.log(error);
            }
        }
    });

    return {
        formik,
        showPassword,
        showHidenPassword
    };

};