import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    ActivityIndicator,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useRegister } from "../hooks/useRegister";
import { styles } from "./register-style";

export function RegisterForm() {
    const {
        formik,
        showPassword,
        showHidenPassword,
    } = useRegister();

    return (
        <View style={styles.content}>

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="account-outline"
                    size={23}
                    color="#E1615F"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Nombre completo"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={formik.values.nombre}
                    onChangeText={(text) =>
                        formik.setFieldValue("nombre", text)
                    }
                    onBlur={formik.handleBlur("nombre")}
                    autoCapitalize="words"
                />
            </View>

            {formik.touched.nombre && formik.errors.nombre && (
                <Text style={styles.error}>
                    {formik.errors.nombre}
                </Text>
            )}

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="card-account-details-outline"
                    size={23}
                    color="#E1615F"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Cédula"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={formik.values.cedula}
                    onChangeText={(text) =>
                        formik.setFieldValue("cedula", text)
                    }
                    onBlur={formik.handleBlur("cedula")}
                    keyboardType="numeric"
                />
            </View>

            {formik.touched.cedula && formik.errors.cedula && (
                <Text style={styles.error}>
                    {formik.errors.cedula}
                </Text>
            )}

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="phone-outline"
                    size={23}
                    color="#E1615F"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Teléfono"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={formik.values.telefono}
                    onChangeText={(text) =>
                        formik.setFieldValue("telefono", text)
                    }
                    onBlur={formik.handleBlur("telefono")}
                    keyboardType="phone-pad"
                />
            </View>

            {formik.touched.telefono && formik.errors.telefono && (
                <Text style={styles.error}>
                    {formik.errors.telefono}
                </Text>
            )}

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="email-outline"
                    size={23}
                    color="#E1615F"
                    style={styles.icon}
                />

                <TextInput
                    placeholder="Correo electrónico"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={formik.values.email}
                    onChangeText={(text) =>
                        formik.setFieldValue("email", text)
                    }
                    onBlur={formik.handleBlur("email")}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            {formik.touched.email && formik.errors.email && (
                <Text style={styles.error}>
                    {formik.errors.email}
                </Text>
            )}

            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    name="lock-outline"
                    size={23}
                    color="#E1615F"
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

            {/* Botón */}
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
                        Crear cuenta
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}