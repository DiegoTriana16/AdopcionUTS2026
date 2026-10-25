import CreatePetForm from "@/screens/formPet/sections/CreatePetForm";
import { View } from "react-native";


const FormPet = () => {
  return (
    <View style={{
      flex: 1
    }}>
      <CreatePetForm />
    </View>
  )
}

export default FormPet;