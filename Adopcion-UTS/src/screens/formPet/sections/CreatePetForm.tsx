import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import useCreatePet from '../hooks/useCretePet';
import { styles } from './createPet-style';


const tiposMascota = ["Perro", "Gato", "Conejo", "Ave"];
const CreatePetForm = () => {

  const { CargarImagen, formik, image } = useCreatePet()
  const inputRef = useRef<TextInput>(null);
  const [showTipos, setShowTipos] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="account-outline"
              size={23}
              color="#E1615F"
              style={styles.icon}
            />

            <TextInput
              ref={inputRef}
              placeholder="Nombre de la mascota"
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
              name="cake-variant-outline"
              size={23}
              color="#E1615F"
              style={styles.icon}
            />

            <TextInput
              placeholder="Edad"
              placeholderTextColor="#999"
              style={styles.input}
              value={formik.values.edad}
              onChangeText={(text) =>
                formik.setFieldValue("edad", text)
              }
              onBlur={formik.handleBlur("edad")}
              keyboardType="numeric"
            />
          </View>

          {formik.touched.edad && formik.errors.edad && (
            <Text style={styles.error}>
              {formik.errors.edad}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="dog"
              size={23}
              color="#E1615F"
              style={styles.icon}
            />

            <TextInput
              placeholder="Raza de la mascota"
              placeholderTextColor="#999"
              style={styles.input}
              value={formik.values.raza}
              onChangeText={(text) =>
                formik.setFieldValue("raza", text)
              }
              onBlur={formik.handleBlur("raza")}
            />
          </View>

          {formik.touched.raza && formik.errors.raza && (
            <Text style={styles.error}>
              {formik.errors.raza}
            </Text>
          )}

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={23}
              color="#E1615F"
              style={styles.icon}
            />

            <TextInput
              placeholder="Ubicación"
              placeholderTextColor="#999"
              style={styles.input}
              value={formik.values.ubicacion}
              onChangeText={(text) =>
                formik.setFieldValue("ubicacion", text)
              }
              onBlur={formik.handleBlur("ubicacion")}
            />
          </View>

          {formik.touched.ubicacion && formik.errors.ubicacion && (
            <Text style={styles.error}>
              {formik.errors.ubicacion}
            </Text>
          )}

          <Text style={styles.label}>
            Género de la mascota
          </Text>

          <View style={styles.genderContainer}>

            <TouchableOpacity
              style={[
                styles.genderButton,
                formik.values.genero === "femenino" &&
                styles.genderButtonSelected,
              ]}
              onPress={() =>
                formik.setFieldValue("genero", "femenino")
              }
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="gender-female"
                size={21}
                color={
                  formik.values.genero === "femenino"
                    ? "#FFFFFF"
                    : "#E1615F"
                }
              />

              <Text
                style={[
                  styles.genderText,
                  formik.values.genero === "femenino" &&
                  styles.genderTextSelected,
                ]}
              >
                Femenino
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderButton,
                formik.values.genero === "masculino" &&
                styles.genderButtonSelected,
              ]}
              onPress={() =>
                formik.setFieldValue("genero", "masculino")
              }
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="gender-male"
                size={21}
                color={
                  formik.values.genero === "masculino"
                    ? "#FFFFFF"
                    : "#E1615F"
                }
              />

              <Text
                style={[
                  styles.genderText,
                  formik.values.genero === "masculino" &&
                  styles.genderTextSelected,
                ]}
              >
                Masculino
              </Text>
            </TouchableOpacity>

          </View>

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="paw-outline"
              size={23}
              color="#E1615F"
              style={styles.icon}
            />

            <TextInput
              placeholder="Tipo de mascota"
              placeholderTextColor="#999"
              style={styles.input}
              value={formik.values.tipo}
              onChangeText={(text) => {
                formik.setFieldValue("tipo", text);
                setShowTipos(true);
              }}
              onFocus={() => setShowTipos(true)}
              onBlur={() => {
                formik.handleBlur("tipo");

                setTimeout(() => {
                  setShowTipos(false);
                }, 150);
              }}
            />
          </View>

          {showTipos && (
            <View style={styles.suggestionsContainer}>
              {tiposMascota
                .filter((tipo) =>
                  tipo.toLowerCase().includes(formik.values.tipo.toLowerCase())
                )
                .map((tipo) => (
                  <TouchableOpacity
                    key={tipo}
                    style={styles.suggestionItem}
                    onPress={() => {
                      formik.setFieldValue("tipo", tipo);
                      setShowTipos(false);
                    }}
                  >
                    <Text style={styles.suggestionText}>{tipo}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          {formik.touched.tipo && formik.errors.tipo && (
            <Text style={styles.error}>
              {formik.errors.tipo}
            </Text>
          )}

          <View style={[styles.inputContainer, styles.descriptionContainer]}>
            <MaterialCommunityIcons
              name="text-box-outline"
              size={23}
              color="#E1615F"
              style={styles.icon}
            />

            <TextInput
              placeholder="Descripción"
              placeholderTextColor="#999"
              style={[styles.input, styles.descriptionInput]}
              value={formik.values.descripcion}
              onChangeText={(text) =>
                formik.setFieldValue("descripcion", text)
              }
              onBlur={formik.handleBlur("descripcion")}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {formik.touched.descripcion && formik.errors.descripcion && (
            <Text style={styles.error}>
              {formik.errors.descripcion}
            </Text>
          )}

          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            ) : (
              <View style={styles.emptyImage}>
                <MaterialCommunityIcons
                  name="image-outline"
                  size={45}
                  color="#E1615F"
                />

                <Text style={styles.emptyImageText}>
                  Selecciona una imagen
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={CargarImagen}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="camera-plus-outline"
              size={22}
              color="#E1615F"
            />

            <Text style={styles.btnSecondaryText}>
              Cargar imagen
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
            activeOpacity={0.8}
          >
            {formik.isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="content-save-outline"
                  size={21}
                  color="#FFFFFF"
                />

                <Text style={styles.btnText}>
                  Guardar mascota
                </Text>
              </>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
export default CreatePetForm