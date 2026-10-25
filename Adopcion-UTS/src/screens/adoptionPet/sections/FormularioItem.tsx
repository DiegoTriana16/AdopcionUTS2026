import { Image, Text, TouchableOpacity, View } from "react-native";

interface FormularioItemProps {
  formulario: Record<string, unknown>;
  onPress: () => void;
  esAdministrador: boolean;
}

export default function FormularioItem({ formulario, onPress, esAdministrador }: FormularioItemProps) {
  const mascota = formulario.mascota as Record<string, unknown> | undefined;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ flexDirection: "row", marginHorizontal: 16, marginVertical: 8, padding: 12, borderRadius: 12, backgroundColor: "#FFFFFF", elevation: 2 }}
    >
      {mascota?.foto ? (
        <Image
          source={{ uri: String(mascota.foto) }}
          style={{ width: 76, height: 76, borderRadius: 10, marginRight: 12 }}
        />
      ) : (
        <View style={{ width: 76, height: 76, borderRadius: 10, marginRight: 12, backgroundColor: "#FDE9E8" }} />
      )}

      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: "800", color: "#333333" }}>
          {String(mascota?.nombre || "Solicitud de adopción")}
        </Text>
        <Text style={{ marginTop: 4, color: "#666666", textTransform: "capitalize" }}>
          {String(mascota?.tipo || "Mascota")}
        </Text>

        <Text style={{ marginTop: 6, color: "#666666" }}>
          Estado: {String(formulario.estado || "En estudio")}
        </Text>

        {esAdministrador && (
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: "#444444" }}>
              Solicitante: {String(formulario.nombreApellido || "No disponible")}
            </Text>
            <Text style={{ color: "#666666", marginTop: 3 }}>
              Correo: {String(formulario.email || "No disponible")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
