import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useLogin } from "../hooks/useLogin";
import { styles } from "./login-style";

export function LoginForm() {
    const router = useRouter();

    const goToHome = () => {
        router.navigate("/drawer/adoption/home");
    };

    const {
        formik,
        showPassword,
        showHidenPassword,
    } = useLogin(goToHome);

    return (
        <View style={styles.content}>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="email-outline"
                    size={23}
                    color="#777"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Correo electrónico"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={formik.values.email}
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    onBlur={formik.handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="lock-outline"
                    size={23}
                    color="#777"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    value={formik.values.password}
                    onChangeText={(text) =>
                        formik.setFieldValue("password", text)
                    }
                    onBlur={formik.handleBlur("password")}
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    onPress={showHidenPassword}
                    activeOpacity={0.7}
                >
                    <MaterialCommunityIcons
                        name={
                            showPassword
                                ? "eye-off-outline"
                                : "eye-outline"
                        }
                        size={23}
                        color="#777"
                    />
                </TouchableOpacity>
            </View>

            {formik.touched.password && formik.errors.password && (
                <Text style={styles.error}>
                    {formik.errors.password}
                </Text>
            )}

            <TouchableOpacity
                style={styles.btnContainer}
                onPress={() => formik.handleSubmit()}
                disabled={formik.isSubmitting}
                activeOpacity={0.8}
            >
                {formik.isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.btnText}>
                        Iniciar sesión
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}