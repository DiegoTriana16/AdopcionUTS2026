import { useAuth } from "@/contexts/AuthContext";
import { MascotaProvider } from "@/contexts/MascotaContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Drawer, DrawerItemList } from "expo-router/drawer";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
    const { user, profile, loading, logout } = useAuth();
    const router = useRouter()

    const goToLogin = () => {
        logout()
        router.navigate("/login")
    }

    return (
        <MascotaProvider>
            <Drawer
                drawerContent={(props) => {
                    return (
                        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                            {/* Perfil */}
                            <View
                                style={{
                                    backgroundColor: "#E1615F",
                                    paddingTop: 35,
                                    paddingBottom: 25,
                                    paddingHorizontal: 20,
                                    alignItems: "center",
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                }}
                            >
                                {/* Imagen */}
                                <View
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: 60,
                                        backgroundColor: "#FFFFFF",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginBottom: 12,
                                        borderWidth: 4,
                                        borderColor: "#FFFFFF",
                                        elevation: 5,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 3,
                                        },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 5,
                                    }}
                                >
                                    <Image
                                        source={profile?.photoURL
                                            ? { uri: profile.photoURL }
                                            : require("../../../assets/img/adopta-no-compres.png")}
                                        style={{
                                            width: 105,
                                            height: 105,
                                            borderRadius: 53,
                                            resizeMode: "contain",
                                        }}
                                    />
                                </View>

                                <Text
                                    style={{
                                        fontSize: 21,
                                        fontWeight: "800",
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                        marginBottom: 4,
                                    }}
                                    numberOfLines={1}
                                >
                                    {loading
                                        ? "Cargando..."
                                        : user?.displayName || "Usuario"}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: "#FFFFFF",
                                        opacity: 0.9,
                                        textAlign: "center",
                                    }}
                                    numberOfLines={1}
                                >
                                    {loading
                                        ? ""
                                        : user?.email || "Sin correo"}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    paddingTop: 15,
                                    paddingHorizontal: 8,
                                }}
                            >
                                <DrawerItemList {...props} />
                            </View>

                            <TouchableOpacity
                                onPress={goToLogin}
                                activeOpacity={0.8}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginHorizontal: 13,
                                    marginBottom: 15,
                                    paddingHorizontal: 15,
                                    paddingVertical: 14,
                                    borderRadius: 12,
                                    backgroundColor: "#FDE9E8",
                                }}
                            >
                                <MaterialCommunityIcons
                                    name="logout"
                                    size={22}
                                    color="#E1615F"
                                />
                                <Text
                                    style={{
                                        color: "#E1615F",
                                        fontSize: 16,
                                        fontWeight: "700",
                                        marginLeft: 12,
                                    }}
                                >
                                    Cerrar sesión
                                </Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    );
                }}
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#FFFFFF",
                        width: 370,
                    },

                    headerStyle: {
                        backgroundColor: "#E1615F",
                    },

                    headerTintColor: "#FFFFFF",

                    headerTitleStyle: {
                        fontWeight: "800",
                        fontSize: 19,
                    },

                    drawerLabelStyle: {
                        color: "#333333",
                        fontSize: 16,
                        fontWeight: "600",
                        marginLeft: -10,
                    },

                    drawerActiveTintColor: "#E1615F",
                    drawerInactiveTintColor: "#555555",

                    drawerActiveBackgroundColor: "#FDE9E8",

                    drawerItemStyle: {
                        borderRadius: 12,
                        marginVertical: 4,
                        paddingHorizontal: 5,
                    },
                }}
            >
                <Drawer.Screen
                    name="adoption"
                    options={{
                        drawerLabel: "Inicio",
                        title: "Inicio",
                    }}
                    listeners={{
                        drawerItemPress: (event) => {
                            event.preventDefault();
                            router.replace("/drawer/adoption/home");
                        },
                    }}
                />
                <Drawer.Screen
                    name="createPet"
                    options={{
                        drawerLabel: "Agregar Mascota",
                        title: "Agregar Mascota",
                        drawerItemStyle:
                            profile?.rol === "admin"
                                ? {
                                    borderRadius: 12,
                                    marginVertical: 4,
                                }
                                : {
                                    display: "none",
                                },
                    }}
                />
                <Drawer.Screen
                    name="listPet"
                    options={{
                        drawerLabel: "Lista de Formularios",
                        title: "Lista de Formularios",

                    }}
                />
                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: "Cuenta",
                        title: "Cuenta",
                    }}
                />
            </Drawer>
        </MascotaProvider>
    );
}