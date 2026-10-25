import COLORS from "@/constants/colors";
import { useMascotas } from "@/contexts/MascotaContext";
import { MascotaModel } from "@/models/Mascota-model";
import {
  AiRecommendationResult,
  getAiRecommendations,
} from "@/services/ai-recommendations";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AnswerKey = "tipo" | "espacio" | "tiempo" | "experiencia";
type Answers = Partial<Record<AnswerKey, string>>;
type Message = { id: string; from: "bot" | "user"; text: string };

const questions: {
  key: AnswerKey;
  text: string;
  options: string[];
}[] = [
    {
      key: "tipo",
      text: "¿Qué compañero te gustaría conocer?",
      options: ["Perro", "Gato", "Cualquiera"],
    },
    {
      key: "espacio",
      text: "¿Cómo es el espacio donde vivirá?",
      options: ["Apartamento", "Casa", "Casa con patio"],
    },
    {
      key: "tiempo",
      text: "¿Cuánto tiempo tendrás para compartir cada día?",
      options: ["Poco tiempo", "Varias horas", "Casi todo el día"],
    },
    {
      key: "experiencia",
      text: "¿Has convivido antes con una mascota?",
      options: ["Es mi primera vez", "Sí, tengo experiencia"],
    },
  ];

function normalize(value: unknown) {
  return String(value || "").toLowerCase().trim();
}

function isAvailable(pet: MascotaModel) {
  const availability = normalize(pet.disponibilidad);
  return availability === "" || availability.includes("adopt") || availability === "true";
}

function scorePet(pet: MascotaModel, answers: Answers) {
  const type = normalize(pet.tipo);
  const age = Number(pet.edad);
  let score = 0;
  const reasons: string[] = [];

  if (answers.tipo && answers.tipo !== "Cualquiera" && type.includes(normalize(answers.tipo))) {
    score += 5;
    reasons.push(`coincide con tu preferencia por ${answers.tipo.toLowerCase()}`);
  }

  if (answers.espacio === "Apartamento" && type.includes("gato")) {
    score += 3;
    reasons.push("puede adaptarse bien a un apartamento");
  }

  if (answers.tiempo === "Poco tiempo" && type.includes("gato")) {
    score += 3;
    reasons.push("suele ser una buena opción para rutinas ocupadas");
  }

  if (answers.tiempo === "Casi todo el día" && type.includes("perro")) {
    score += 2;
    reasons.push("podrás dedicarle bastante tiempo y compañía");
  }

  if (answers.experiencia === "Es mi primera vez" && age > 0 && age >= 2) {
    score += 2;
    reasons.push("su edad puede facilitar una primera experiencia");
  }

  if (answers.espacio === "Casa con patio" && type.includes("perro")) {
    score += 2;
    reasons.push("el espacio puede favorecer su actividad");
  }

  return {
    pet,
    score,
    reason: reasons.length > 0
      ? `Te la recomendamos porque ${reasons.join(" y ")}.`
      : "Puede ser una buena opción para conocer y crear un vínculo.",
  };
}

export default function RecommendationsScreen() {
  const router = useRouter();
  const { mascotas, loading, getMascotas } = useMascotas();
  const [answers, setAnswers] = useState<Answers>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [aiResult, setAiResult] = useState<AiRecommendationResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      from: "bot",
      text: "Hola. Te ayudaré a encontrar una mascota que encaje contigo. Responde unas preguntas rápidas.",
    },
  ]);

  useEffect(() => {
    if (mascotas.length === 0) {
      getMascotas();
    }
  }, [getMascotas, mascotas.length]);

  const currentQuestion = questions[questionIndex];
  const completed = questionIndex >= questions.length;
  const fallbackRecommendations = useMemo(
    () => mascotas
      .filter(isAvailable)
      .map((pet) => scorePet(pet, answers))
      .sort((first, second) => second.score - first.score)
      .slice(0, 3),
    [answers, mascotas],
  );

  const recommendations = useMemo(() => {
    if (!aiResult) return fallbackRecommendations;

    return aiResult.recommendations
      .map((recommendation) => {
        const pet = mascotas.find((item) => item.id === recommendation.petId);
        return pet ? { pet, reason: recommendation.reason } : null;
      })
      .filter((recommendation): recommendation is { pet: MascotaModel; reason: string } => recommendation !== null);
  }, [aiResult, fallbackRecommendations, mascotas]);

  const chooseAnswer = async (answer: string) => {
    if (!currentQuestion) return;

    const nextAnswers = { ...answers, [currentQuestion.key]: answer };
    setAnswers(nextAnswers);
    const nextMessage: Message = questionIndex + 1 < questions.length
      ? { id: `question-${questionIndex + 1}`, from: "bot", text: questions[questionIndex + 1].text }
      : { id: "results", from: "bot", text: "Gracias. Encontré estas opciones para ti." };

    setMessages((current) => [
      ...current,
      { id: `answer-${currentQuestion.key}`, from: "user", text: answer },
      nextMessage,
    ]);
    setQuestionIndex((current) => current + 1);

    if (questionIndex + 1 === questions.length) {
      setAiLoading(true);

      try {
        const result = await getAiRecommendations(nextAnswers, mascotas.filter(isAvailable));
        setAiResult(result);
        setMessages((current) => [
          ...current,
          { id: "ai-result", from: "bot", text: result.message },
        ]);
      } catch (error) {
        console.warn("No fue posible consultar la IA; se usará el respaldo local.", error);
        setMessages((current) => [
          ...current,
          { id: "ai-fallback", from: "bot", text: "No pude consultar el asesor de IA en este momento. Te muestro una recomendación basada en los datos disponibles." },
        ]);
      } finally {
        setAiLoading(false);
      }
    }
  };

  const restart = () => {
    setAnswers({});
    setQuestionIndex(0);
    setAiResult(null);
    setAiLoading(false);
    setMessages([
      {
        id: "welcome-restart",
        from: "bot",
        text: "Empecemos de nuevo. ¿Qué compañero te gustaría conocer?",
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F8F7" }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: COLORS.primary }}>
        <Text style={{ color: "#FFFFFF", fontSize: 25, fontWeight: "800" }}>Encuentra tu compañero</Text>
        <Text style={{ color: "#DCE9E7", marginTop: 5 }}>Recomendaciones pensadas para tu estilo de vida</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 18, padding: 14, marginBottom: 16, elevation: 2 }}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={{ alignSelf: message.from === "user" ? "flex-end" : "flex-start", maxWidth: "88%", backgroundColor: message.from === "user" ? COLORS.primary : "#E7F0EF", borderRadius: 14, padding: 12, marginBottom: 8 }}
            >
              <Text style={{ color: message.from === "user" ? "#FFFFFF" : "#304747", lineHeight: 20 }}>{message.text}</Text>
            </View>
          ))}

          {!completed && currentQuestion && (
            <View style={{ marginTop: 6 }}>
              <Text style={{ color: "#304747", fontWeight: "800", marginBottom: 10 }}>{currentQuestion.text}</Text>
              <View style={{ gap: 8 }}>
                {currentQuestion.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => chooseAnswer(option)}
                    style={{ borderWidth: 1, borderColor: COLORS.secondary, borderRadius: 10, padding: 12 }}
                  >
                    <Text style={{ color: COLORS.primary, fontWeight: "700" }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>

        {loading || aiLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : completed ? (
          <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <Text style={{ color: "#304747", fontSize: 19, fontWeight: "800" }}>Tus recomendaciones</Text>
              <TouchableOpacity onPress={restart}>
                <Text style={{ color: COLORS.primary, fontWeight: "700" }}>Reiniciar</Text>
              </TouchableOpacity>
            </View>

            {recommendations.length === 0 ? (
              <Text style={{ color: "#666666", backgroundColor: "#FFFFFF", padding: 16, borderRadius: 12 }}>No hay mascotas disponibles en este momento.</Text>
            ) : (
              recommendations.map(({ pet, reason }) => (
                <View key={pet.id} style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: 12, marginBottom: 12, elevation: 2 }}>
                  {pet.foto ? (
                    <Image source={{ uri: pet.foto }} style={{ width: "100%", height: 155, borderRadius: 12 }} />
                  ) : null}
                  <Text style={{ color: "#304747", fontSize: 20, fontWeight: "800", marginTop: 10 }}>{pet.nombre}</Text>
                  <Text style={{ color: COLORS.primary, marginTop: 3, textTransform: "capitalize" }}>{pet.tipo} · {pet.edad} años</Text>
                  <Text style={{ color: "#666666", lineHeight: 20, marginTop: 8 }}>{reason}</Text>
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: "/drawer/adoption/adoptionForm", params: { pet: JSON.stringify(pet) } })}
                    style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 7, backgroundColor: COLORS.primary, borderRadius: 10, padding: 13, marginTop: 12 }}
                  >
                    <MaterialCommunityIcons name="heart-outline" size={19} color="#FFFFFF" />
                    <Text style={{ color: "#FFFFFF", fontWeight: "800" }}>Conocer y adoptar</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
