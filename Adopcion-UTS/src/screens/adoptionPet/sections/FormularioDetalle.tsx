import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../../../../firebase";

interface FormularioDetalleProps {
  formularioSeleccionado: Record<string, unknown> | null;
  closeModal: () => void;
  rol?: string;
  onSaved?: (revision: { estado: string; recomendaciones: string; observaciones: string }) => void;
}

const estados = ["En estudio", "Aprobado", "Rechazado", "Mascota no disponible"];

export default function FormularioDetalle({ formularioSeleccionado, closeModal, rol, onSaved }: FormularioDetalleProps) {
  const [guardando, setGuardando] = useState(false);
  const [estado, setEstado] = useState(String(formularioSeleccionado?.estado || "En estudio"));
  const [recomendaciones, setRecomendaciones] = useState(String(formularioSeleccionado?.recomendaciones || ""));
  const [observaciones, setObservaciones] = useState(String(formularioSeleccionado?.observaciones || ""));

  if (!formularioSeleccionado) return null;

  const mascota = formularioSeleccionado.mascota as Record<string, unknown> | undefined;
  const fotoMascota = typeof mascota?.foto === "string" ? mascota.foto : "";

  const guardarRevision = async () => {
    const id = String(formularioSeleccionado.id || "");
    const coleccion = String(formularioSeleccionado.coleccion || "formularioAdopcion");

    if (!id) return;

    try {
      setGuardando(true);
      await updateDoc(doc(db, coleccion, id), {
        estado,
        recomendaciones,
        observaciones,
      });
      Alert.alert("Formulario actualizado", "La revisión se guardó correctamente.");
      onSaved?.({ estado, recomendaciones, observaciones });
      closeModal();
    } catch (error) {
      console.error("Error actualizando formulario:", error);
      Alert.alert("Error", "No se pudo guardar la revisión.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, backgroundColor: "#FFFFFF" }}>
      <Text style={{ fontSize: 22, fontWeight: "800", color: "#333333", marginBottom: 20 }}>
        Solicitud de adopción
      </Text>

      {fotoMascota && (
        <Image
          source={{ uri: fotoMascota }}
          style={{ width: "100%", height: 190, borderRadius: 14, marginBottom: 18 }}
        />
      )}
      <Text style={{ fontSize: 19, fontWeight: "800", marginBottom: 14 }}>
        Mascota: {String(mascota?.nombre || "No disponible")}
      </Text>

      <Text style={{ marginBottom: 8 }}>Tipo: {String(mascota?.tipo || "No disponible")}</Text>
      <Text style={{ marginBottom: 8 }}>Edad: {String(mascota?.edad || "No disponible")}</Text>
      <Text style={{ marginBottom: 8 }}>Raza: {String(mascota?.raza || "No disponible")}</Text>
      <Text style={{ marginBottom: 8 }}>Ubicación: {String(mascota?.ubicacion || "No disponible")}</Text>
      <Text style={{ marginBottom: 18 }}>Descripción: {String(mascota?.descripcion || "No disponible")}</Text>

      <Text style={{ fontSize: 17, fontWeight: "800", marginBottom: 12 }}>Datos del solicitante</Text>
      <Text style={{ marginBottom: 8 }}>Nombre: {String(formularioSeleccionado.nombreApellido || "No disponible")}</Text>
      <Text style={{ marginBottom: 8 }}>Cédula: {String(formularioSeleccionado.cedula || "No disponible")}</Text>
      <Text style={{ marginBottom: 8 }}>Teléfono: {String(formularioSeleccionado.celular || "No disponible")}</Text>
      <Text style={{ marginBottom: 8 }}>Correo: {String(formularioSeleccionado.email || "No disponible")}</Text>

      <Text style={{ fontSize: 17, fontWeight: "800", marginTop: 12, marginBottom: 12 }}>Formulario diligenciado</Text>
      {[
        ["Dirección", "direccion"],
        ["Profesión", "profesion"],
        ["Motivo de adopción", "motivoAdopcion"],
        ["Tipo de vivienda", "vivesCasaApartamento"],
        ["Permiten mascotas", "permitenMascotas"],
        ["Mudanza", "mudanza"],
        ["Familiar alérgico", "familiarAlergico"],
        ["Experiencia con mascotas", "experienciasMascotas"],
        ["Qué pasó con mascotas anteriores", "quePasoConMascotasAnteriores"],
        ["Otras mascotas", "tieneOtrasMascotas"],
        ["Lugar donde dormirá", "lugarDormirMascota"],
        ["Mascotas durante viajes", "queHacesConMascotasEnViaje"],
      ].map(([label, key]) => (
        <Text key={key} style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: "700" }}>{label}: </Text>
          {String(formularioSeleccionado[key] ?? "No disponible")}
        </Text>
      ))}

      {rol === "admin" && (
        <View style={{ marginTop: 18 }}>
          <Text style={{ fontSize: 17, fontWeight: "800", marginBottom: 12 }}>Revisión administrativa</Text>

          <Text style={{ fontWeight: "700", marginBottom: 6 }}>Estado</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
            {estados.map((opcion) => (
              <TouchableOpacity
                key={opcion}
                onPress={() => setEstado(opcion)}
                style={{ paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#E1615F", backgroundColor: estado === opcion ? "#E1615F" : "#FFFFFF" }}
              >
                <Text style={{ color: estado === opcion ? "#FFFFFF" : "#E1615F", fontWeight: "700" }}>{opcion}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={{ fontWeight: "700", marginBottom: 6 }}>Recomendaciones</Text>
          <TextInput
            value={recomendaciones}
            onChangeText={setRecomendaciones}
            multiline
            placeholder="Escribe recomendaciones"
            style={{ minHeight: 90, borderWidth: 1, borderColor: "#DDD", borderRadius: 10, padding: 12, textAlignVertical: "top", marginBottom: 14 }}
          />

          <Text style={{ fontWeight: "700", marginBottom: 6 }}>Observaciones</Text>
          <TextInput
            value={observaciones}
            onChangeText={setObservaciones}
            multiline
            placeholder="Escribe observaciones"
            style={{ minHeight: 90, borderWidth: 1, borderColor: "#DDD", borderRadius: 10, padding: 12, textAlignVertical: "top" }}
          />

          <TouchableOpacity
            onPress={guardarRevision}
            disabled={guardando}
            style={{ marginTop: 18, backgroundColor: "#E1615F", padding: 14, borderRadius: 10, alignItems: "center" }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>{guardando ? "Guardando..." : "Guardar revisión"}</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={closeModal}
        style={{ marginTop: 20, backgroundColor: "#777777", padding: 14, borderRadius: 10, alignItems: "center" }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>Cerrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
