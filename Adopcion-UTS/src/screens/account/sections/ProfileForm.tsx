import { useProfile } from "@/screens/account/hooks/useProfile";
import { styles } from "@/screens/account/sections/profile-style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const ProfileForm = () => {
  const {
    formik,
    fieldError,
    user,
    selectPhoto,
    photoUri
  } = useProfile()

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid extraScrollHeight={20} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={selectPhoto} activeOpacity={0.8}>
          <View style={styles.avatarContainer}>
            {photoUri || user?.photoURL ? (
              <Image source={{ uri: photoUri || user?.photoURL || "" }} style={styles.avatar} />
            ) : (
              <Image source={require("../../../../assets/img/no-user.webp")} style={styles.avatarFallback} />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.changePhoto}>Cambiar foto</Text>
        <Text style={styles.title}>Mi perfil</Text>
        <Text style={styles.subtitle}>{user?.email || "Sin correo"}</Text>
      </View>

      <Text style={styles.sectionTitle}>Datos personales</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="account-outline" size={23} color="#E1615F" />
        <TextInput placeholder="Nombre completo" placeholderTextColor="#999" style={styles.input} value={formik.values.nombre} onChangeText={(text) => formik.setFieldValue("nombre", text)} onBlur={formik.handleBlur("nombre")} autoCapitalize="words" />
      </View>
      {fieldError("nombre")}

      <Text style={styles.sectionTitle}>Cambiar contraseña</Text>
      {(["currentPassword", "newPassword", "confirmPassword"] as const).map((field) => (
        <View key={field}>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={23} color="#E1615F" />
            <TextInput
              placeholder={{ currentPassword: "Contraseña actual", newPassword: "Nueva contraseña", confirmPassword: "Confirmar contraseña" }[field]}
              placeholderTextColor="#999"
              style={styles.input}
              secureTextEntry
              value={formik.values[field]}
              onChangeText={(text) => formik.setFieldValue(field, text)}
              onBlur={formik.handleBlur(field)}
              autoCapitalize="none"
            />
          </View>
          {fieldError(field)}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => formik.handleSubmit()} disabled={formik.isSubmitting} activeOpacity={0.8}>
        {formik.isSubmitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Guardar cambios</Text>}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}

export default ProfileForm;