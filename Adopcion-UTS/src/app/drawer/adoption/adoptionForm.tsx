import { MascotaModel } from "@/models/Mascota-model";
import FormularioAdop from "@/screens/adoptionPet/sections/formAdoption";
import { useLocalSearchParams } from "expo-router";

export default function AdoptionForm() {
  const { pet: petParam } = useLocalSearchParams<{ pet?: string }>();
  let pet: MascotaModel | null = null;

  try {
    pet = petParam ? JSON.parse(petParam) as MascotaModel : null;
  } catch {
    pet = null;
  }

  return <FormularioAdop pet={pet} />;
}

