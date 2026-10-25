import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { MascotaModel } from "@/models/Mascota-model";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { style } from "../sections/home-style";

interface Pet {
    pet: MascotaModel;
}

export function CardPet({ pet }: Pet) {
    const { profile } = useAuth()
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const goToDetail = () => {
        setModalVisible(true);
    };

    const goToAdoptionForm = () => {
        setModalVisible(false);
        router.push({
            pathname: "/drawer/adoption/adoptionForm",
            params: { pet: JSON.stringify(pet) },
        });
    };
    return (
        <>
            <TouchableOpacity activeOpacity={0.8} onPress={goToDetail}>
                <View style={style.cardContainer}>

                    <View style={style.cardImageContainer}>
                        <Image
                            source={{ uri: pet.foto }}
                            style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain"
                            }}
                        />
                    </View>

                    <View style={style.cardDetailsContainer}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: COLORS.dark,
                                    fontSize: 20,
                                    textTransform: "capitalize"
                                }}
                            >
                                {pet?.nombre}
                            </Text>
                            {pet.genero === "masculino" ? (
                                <MaterialCommunityIcons
                                    name="gender-male" size={22} color="#5087e6" />
                            ) : (
                                <MaterialCommunityIcons name="gender-female" size={22} color="#cf69bf" />
                            )}
                        </View>

                        <Text
                            style={{ fontSize: 16, marginTop: 5, color: COLORS.dark, textTransform: "capitalize" }}
                        >
                            {pet?.tipo}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 5, color: COLORS.grey }}>{`${pet?.edad} Años`}</Text>

                        <View style={{ marginTop: 5, flexDirection: "row" }}>
                            <MaterialCommunityIcons name="map-marker" color={COLORS.primary} size={16} />
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLORS.grey,
                                    textTransform: "capitalize"
                                }}
                            >
                                {pet?.ubicacion}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.45)" }}>
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={() => setModalVisible(false)}
                    />

                    <View style={{ maxHeight: "82%", backgroundColor: "#FFFFFF", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ alignItems: "center" }}>
                                <View style={{ width: 42, height: 5, borderRadius: 3, backgroundColor: "#D7D7D7", marginBottom: 16 }} />
                                <Image
                                    source={{ uri: pet.foto }}
                                    style={{ width: 190, height: 190, borderRadius: 18, resizeMode: "cover" }}
                                />
                            </View>

                            <Text style={{ color: COLORS.dark, fontSize: 26, fontWeight: "800", marginTop: 18, textTransform: "capitalize" }}>
                                {pet.nombre}
                            </Text>
                            <Text style={{ color: COLORS.primary, fontSize: 16, fontWeight: "700", marginTop: 4, textTransform: "capitalize" }}>
                                {pet.tipo} · {pet.edad} años
                            </Text>

                            <View style={{ marginTop: 18, gap: 12 }}>
                                <Text style={{ color: COLORS.grey, fontSize: 15 }}>
                                    <Text style={{ fontWeight: "700", color: COLORS.dark }}>Raza: </Text>{pet.raza || "No especificada"}
                                </Text>
                                <Text style={{ color: COLORS.grey, fontSize: 15 }}>
                                    <Text style={{ fontWeight: "700", color: COLORS.dark }}>Ubicación: </Text>{pet.ubicacion || "No especificada"}
                                </Text>
                                <Text style={{ color: COLORS.grey, fontSize: 15, lineHeight: 22 }}>
                                    <Text style={{ fontWeight: "700", color: COLORS.dark }}>Descripción: </Text>{pet.descripcion || "Sin descripción disponible."}
                                </Text>
                            </View>

                            {
                                profile?.rol === "user" && (
                                    <TouchableOpacity
                                        activeOpacity={0.85}
                                        onPress={goToAdoptionForm}
                                        style={{ backgroundColor: COLORS.primary, borderRadius: 12, alignItems: "center", paddingVertical: 15, marginTop: 24, marginBottom: 8 }}
                                    >
                                        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "800" }}>Adoptar</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
};