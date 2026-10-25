import { styles } from "@/screens/login/sections/login-style";
import { LoginForm } from "@/screens/login/sections/LoginForm";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

const LoginPage = () => {
  const router = useRouter();

  const goToRegister = () => {
    router.navigate("/register");
  };


  return (
    <View style={styles.contentLogin}>
      <Image
        source={require("../../assets/img/No-compres.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Bienvenido</Text>

      <Text style={styles.subtitle}>
        Inicia sesión para continuar
      </Text>

      <LoginForm />

      <Text style={styles.textRegister}>
        ¿Aún no tienes cuenta?{" "}
        <Text
          style={styles.btnRegister}
          onPress={goToRegister}
        >
          Registrarse
        </Text>
      </Text>
    </View>
  );
};

export default LoginPage;