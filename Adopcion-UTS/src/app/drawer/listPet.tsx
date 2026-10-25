import { useAuth } from "@/contexts/AuthContext";
import { ListaFormulario } from "@/screens/adoptionPet/sections/listAdoptionPet";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ListPetForm = () => {
  const router = useRouter();
  const { profile } = useAuth()

  const goToNuevoFormulario = () => {
    router.navigate("/drawer/adoption/home")
  }


  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginLeft: 'auto', marginRight: 'auto' }}>
          Formulario
        </Text>
        <ListaFormulario />

        {
          profile?.rol === "user" && (
            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={goToNuevoFormulario}
                activeOpacity={0.8}
              >
                <Text style={styles.btnText}>Nueva Adopcion</Text>
              </TouchableOpacity>

            </View>
          )}
      </View>
    </ScrollView>
  )
}

export default ListPetForm



const styles = StyleSheet.create({

  btnContainer: {
    width: "80%",
    height: 60,
    backgroundColor: "#E1615F",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,

    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  }

})

