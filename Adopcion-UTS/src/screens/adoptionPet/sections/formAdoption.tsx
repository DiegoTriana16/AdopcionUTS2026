import { MascotaModel } from "@/models/Mascota-model";
import { styles } from "@/screens/adoptionPet/sections/adoptionPet-style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAdoptionForm } from "../../../screens/adoptionPet/hooks/useAdoptionForm";


const FormularioAdop = ({ pet }: { pet: MascotaModel | null }) => {
  const { formik, confirmarEnvio, loading, profile } = useAdoptionForm(pet);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E1615F" />
      </View>
    );
  }

  if (!pet || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se pudo cargar la mascota o el perfil del usuario.</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentRegister}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* TÍTULO */}
        <Text style={styles.title}>DATOS FORMULARIO</Text>

        {/* DATOS PERSONALES */}
        <Text style={styles.sectionTitle}>DATOS PERSONALES</Text>

        {/* NOMBRE */}
        <Text style={styles.label}>Nombre completo</Text>

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
            value={formik.values.nombreApellido}
            editable={false}
          />
        </View>

        {formik.touched.nombreApellido && formik.errors.nombreApellido && (
          <Text style={styles.error}>
            {formik.errors.nombreApellido}
          </Text>
        )}

        {/* CÉDULA */}
        <Text style={styles.label}>Cédula</Text>

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
            editable={false}
            keyboardType="numeric"
          />
        </View>

        {formik.touched.cedula && formik.errors.cedula && (
          <Text style={styles.error}>
            {formik.errors.cedula}
          </Text>
        )}

        {/* TELÉFONO */}
        <Text style={styles.label}>Teléfono</Text>

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
            value={formik.values.celular}
            editable={false}
            keyboardType="phone-pad"
          />
        </View>

        {formik.touched.celular && formik.errors.celular && (
          <Text style={styles.error}>
            {formik.errors.celular}
          </Text>
        )}

        {/* DIRECCIÓN */}
        <Text style={styles.label}>Dirección</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={23}
            color="#E1615F"
            style={styles.icon}
          />

          <TextInput
            placeholder="Dirección"
            placeholderTextColor="#999"
            style={styles.input}
            value={formik.values.direccion}
            onChangeText={(text) =>
              formik.setFieldValue("direccion", text)
            }
            onBlur={formik.handleBlur("direccion")}
          />
        </View>

        {formik.touched.direccion && formik.errors.direccion && (
          <Text style={styles.error}>
            {formik.errors.direccion}
          </Text>
        )}

        {/* PROFESIÓN */}
        <Text style={styles.label}>Profesión</Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="briefcase-outline"
            size={23}
            color="#E1615F"
            style={styles.icon}
          />

          <TextInput
            placeholder="Profesión"
            placeholderTextColor="#999"
            style={styles.input}
            value={formik.values.profesion}
            onChangeText={(text) =>
              formik.setFieldValue("profesion", text)
            }
          />
        </View>

        {/* MOTIVO */}
        <Text style={styles.label}>¿Por qué desea adoptar?</Text>

        <View style={styles.textAreaContainer}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={23}
            color="#E1615F"
            style={styles.textAreaIcon}
          />

          <TextInput
            placeholder="Cuéntanos por qué deseas adoptar"
            placeholderTextColor="#999"
            style={styles.textArea}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formik.values.motivoAdopcion}
            onChangeText={(text) =>
              formik.setFieldValue("motivoAdopcion", text)
            }
          />
        </View>

        {/* CRITERIO DE ADOPCIÓN */}
        <Text style={styles.sectionTitle}>CRITERIO DE ADOPCIÓN</Text>

        {/* CASA / APARTAMENTO */}
        <Text style={styles.question}>
          ¿Vives en casa o apartamento?
        </Text>

        <View style={styles.optionsContainer}>
          {["Casa", "Apartamento"].map((option) => {
            const selected =
              formik.values.vivesCasaApartamento === option;

            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() =>
                  formik.setFieldValue(
                    "vivesCasaApartamento",
                    option
                  )
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PERMITEN MASCOTAS */}
        <Text style={styles.question}>
          ¿Permiten mascotas en tu lugar de vivienda?
        </Text>

        <View style={styles.optionsContainer}>
          {[
            { label: "Sí", value: true },
            { label: "No", value: false },
          ].map((option) => {
            const selected =
              formik.values.permitenMascotas === option.value;

            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() =>
                  formik.setFieldValue(
                    "permitenMascotas",
                    option.value
                  )
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* MUDANZA */}
        <Text style={styles.label}>
          ¿Qué harías si tuvieras que mudarte?
        </Text>

        <View style={styles.textAreaContainer}>
          <MaterialCommunityIcons
            name="home-export-outline"
            size={23}
            color="#E1615F"
            style={styles.textAreaIcon}
          />

          <TextInput
            placeholder="Cuéntanos qué harías con tu mascota"
            placeholderTextColor="#999"
            style={styles.textArea}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formik.values.mudanza}
            onChangeText={(text) =>
              formik.setFieldValue("mudanza", text)
            }
          />
        </View>

        {/* ALERGIA */}
        <Text style={styles.question}>
          ¿Algún familiar alérgico a las mascotas?
        </Text>

        <View style={styles.optionsContainer}>
          {[
            { label: "Sí", value: true },
            { label: "No", value: false },
          ].map((option) => {
            const selected =
              formik.values.familiarAlergico === option.value;

            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() =>
                  formik.setFieldValue(
                    "familiarAlergico",
                    option.value
                  )
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* SOBRE LAS MASCOTAS */}
        <Text style={styles.sectionTitle}>SOBRE LAS MASCOTAS</Text>

        {/* EXPERIENCIA */}
        <Text style={styles.question}>
          ¿Has tenido mascotas antes?
        </Text>

        <View style={styles.optionsContainer}>
          {[
            { label: "Sí", value: true },
            { label: "No", value: false },
          ].map((option) => {
            const selected =
              formik.values.experienciasMascotas === option.value;

            return (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.optionButton,
                  selected && styles.optionButtonSelected,
                ]}
                onPress={() =>
                  formik.setFieldValue(
                    "experienciasMascotas",
                    option.value
                  )
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    selected && styles.optionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* QUÉ PASÓ */}
        <Text style={styles.label}>
          ¿Qué pasó con ellas?
        </Text>

        <View style={styles.textAreaContainer}>
          <MaterialCommunityIcons
            name="paw-outline"
            size={23}
            color="#E1615F"
            style={styles.textAreaIcon}
          />

          <TextInput
            placeholder="Cuéntanos qué pasó con ellas"
            placeholderTextColor="#999"
            style={styles.textArea}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formik.values.quePasoConMascotasAnteriores}
            onChangeText={(text) =>
              formik.setFieldValue(
                "quePasoConMascotasAnteriores",
                text
              )
            }
          />
        </View>

        {/* OTRAS MASCOTAS */}
        <Text style={styles.label}>
          ¿Tienes otras mascotas actualmente?
        </Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="dog-service"
            size={23}
            color="#E1615F"
            style={styles.icon}
          />

          <TextInput
            placeholder="Describe tus mascotas actuales"
            placeholderTextColor="#999"
            style={styles.input}
            value={formik.values.tieneOtrasMascotas}
            onChangeText={(text) =>
              formik.setFieldValue(
                "tieneOtrasMascotas",
                text
              )
            }
          />
        </View>

        {/* LUGAR PARA DORMIR */}
        <Text style={styles.label}>
          ¿Dónde dormirá la mascota?
        </Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="home-circle-outline"
            size={23}
            color="#E1615F"
            style={styles.icon}
          />

          <TextInput
            placeholder="¿Dónde dormirá?"
            placeholderTextColor="#999"
            style={styles.input}
            value={formik.values.lugarDormirMascota}
            onChangeText={(text) =>
              formik.setFieldValue(
                "lugarDormirMascota",
                text
              )
            }
          />
        </View>

        {/* VIAJES */}
        <Text style={styles.label}>
          ¿Qué harás con tus mascotas si realizas un viaje?
        </Text>

        <View style={styles.textAreaContainer}>
          <MaterialCommunityIcons
            name="airplane"
            size={23}
            color="#E1615F"
            style={styles.textAreaIcon}
          />

          <TextInput
            placeholder="Cuéntanos qué harías con tu mascota"
            placeholderTextColor="#999"
            style={styles.textArea}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formik.values.queHacesConMascotasEnViaje}
            onChangeText={(text) =>
              formik.setFieldValue(
                "queHacesConMascotasEnViaje",
                text
              )
            }
          />
        </View>

        {/* BOTÓN */}
        <TouchableOpacity
          style={styles.btn}
          onPress={confirmarEnvio}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <MaterialCommunityIcons
                name="file-document-check-outline"
                size={21}
                color="#fff"
              />

              <Text style={styles.btnText}>
                Generar Solicitud de Adopción
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

export default FormularioAdop