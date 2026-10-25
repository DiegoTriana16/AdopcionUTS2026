import { styles } from "@/screens/register/sections/register-style";
import { RegisterForm } from "@/screens/register/sections/RegisterForm";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Register = () => {
    const router = useRouter();

    const goToLogin = () => {
        router.navigate("/login");
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.contentRegister}
            enableOnAndroid
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
        >
            <Image
                source={require("../../assets/img/imagen2.jpg")}
                style={styles.image}
            />

            <View style={styles.formContainer}>
                <Text style={styles.title}>Crear cuenta</Text>

                <Text style={styles.subtitle}>
                    Regístrate para comenzar
                </Text>

                <RegisterForm />

                <Text style={styles.textRegister}>
                    ¿Ya tienes cuenta?{" "}
                    <Text
                        style={styles.btnRegister}
                        onPress={goToLogin}
                    >
                        Inicia sesión
                    </Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default Register;