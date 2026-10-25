import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomePage = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.navigate("/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/img/adopta-no-compres.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>
          ¿Te gustaría adoptar?
        </Text>

        <Text style={styles.description}>
          Encuentra a tu nuevo mejor amigo y dale la oportunidad
          de tener un hogar lleno de amor.
        </Text>

        <Text style={styles.descriptionSecondary}>
          🐾 Adopta, no compres. 🐾
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Comenzar
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Cada mascota merece un hogar ❤️
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1615F",
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  image: {
    width: "85%",
    height: 300,
    resizeMode: "contain",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 30,
    paddingTop: 35,
    paddingBottom: 30,
    alignItems: "center",
  },

  title: {
    color: "#292929",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 15,
  },

  description: {
    color: "#666666",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 10,
  },

  descriptionSecondary: {
    color: "#E1615F",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
    marginBottom: 25,
  },

  button: {
    width: "100%",
    height: 58,
    backgroundColor: "#E1615F",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  footerText: {
    color: "#999999",
    fontSize: 15,
    marginTop: 18,
  },
});