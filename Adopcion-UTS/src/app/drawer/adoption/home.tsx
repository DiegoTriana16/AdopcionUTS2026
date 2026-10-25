import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import Icon from "@/components/Icon";
import COLORS from "@/constants/colors";
import { useMascotas } from "@/contexts/MascotaContext";
import { CardPet } from "@/screens/home/components/CardPet";
import { petCategories } from "@/screens/home/constants/list-categories";
import { style } from "@/screens/home/sections/home-style";
import { useFocusEffect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const {
        mascotas,
        loading,
        getMascotas,
    } = useMascotas();

    useFocusEffect(
        useCallback(() => {
            getMascotas();
        }, [])
    );

    const listaFiltrada = selectedCategory
        ? mascotas.filter(
            (item) =>
                item.tipo?.toLowerCase() ===
                selectedCategory.toLowerCase()
        )
        : mascotas;

    const handleFilter = (tipo: string) => {
        if (selectedCategory === tipo) {
            setSelectedCategory(null);
            return;
        }

        setSelectedCategory(tipo);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.mainContainer}>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {petCategories.map((category) => (
                        <View
                            key={category.name}
                            style={{
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    handleFilter(
                                        category.name
                                    )
                                }
                                style={[
                                    style.categoryBtn,
                                    {
                                        backgroundColor:
                                            selectedCategory ===
                                                category.name
                                                ? COLORS.primary
                                                : COLORS.white,
                                    },
                                ]}
                            >
                                <Icon
                                    name={category.icon}
                                    size={30}
                                    color={
                                        selectedCategory ===
                                            category.name
                                            ? COLORS.white
                                            : COLORS.primary
                                    }
                                    type={category.type}
                                />
                            </TouchableOpacity>

                            <Text
                                style={
                                    style.categoryBtnName
                                }
                            >
                                {category.name}
                            </Text>
                        </View>
                    ))}
                </View>

                <View
                    style={{
                        marginTop: 20,
                        flex: 1,
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => router.push("/drawer/adoption/recommendations")}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: COLORS.primary,
                            borderRadius: 14,
                            padding: 15,
                            marginBottom: 14,
                        }}
                    >
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={{ color: COLORS.white, fontSize: 16, fontWeight: "800" }}>
                                ¿No sabes cuál elegir?
                            </Text>
                            <Text style={{ color: "#DCE9E7", marginTop: 3 }}>
                                Responde unas preguntas y encuentra tu mejor opción
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : listaFiltrada.length > 0 ? (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={listaFiltrada}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <CardPet pet={item} />
                            )}
                        />
                    ) : (
                        <Text>
                            No hay mascotas disponibles.
                        </Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;



// import { useLocalSearchParams } from "expo-router";
// import type { Animal } from "../src/types/Animal";

// export default function DetailsScreen() {
//     const { pet } = useLocalSearchParams<{ pet: string }>();

//     const animal: Animal = JSON.parse(pet);

//     console.log(animal.nombre);
//     console.log(animal.edad);
//     console.log(animal.foto);

//     return null;
// }