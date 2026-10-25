import { MascotaModel } from "@/models/Mascota-model";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { app } from "../../firebase";

interface AiRecommendation {
  petId: string;
  reason: string;
}

export interface AiRecommendationResult {
  message: string;
  recommendations: AiRecommendation[];
}

function extractJson(text: string) {
  const cleaned = text.replace(/```json|```/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("La respuesta de IA no contiene JSON válido.");
  }

  return JSON.parse(cleaned.slice(start, end + 1)) as AiRecommendationResult;
}

async function generateWithRest(prompt: string, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`La API REST de Gemini respondió con ${response.status}.`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function getAiRecommendations(
  answers: Record<string, string>,
  mascotas: MascotaModel[],
): Promise<AiRecommendationResult> {
  const catalogo = mascotas.map((pet) => ({
    id: pet.id,
    nombre: pet.nombre,
    tipo: pet.tipo,
    edad: pet.edad,
    genero: pet.genero,
    raza: pet.raza,
    ubicacion: pet.ubicacion,
    descripcion: pet.descripcion,
    disponibilidad: pet.disponibilidad,
  }));

  const prompt = `
Eres un asesor experto y empático de adopción responsable.
Analiza las respuestas de la persona y el catálogo de mascotas disponibles.
Recomienda como máximo 3 mascotas que realmente encajen con su situación.
No inventes mascotas ni datos. Usa únicamente los ids del catálogo.
Si una mascota no está disponible, no la recomiendes.
La respuesta debe estar en español y ser cálida, clara y breve.

Respuestas de la persona:
${JSON.stringify(answers)}

Catálogo:
${JSON.stringify(catalogo)}

Responde únicamente con este JSON válido:
{
  "message": "explicación general de la recomendación",
  "recommendations": [
    { "petId": "id exacto del catálogo", "reason": "por qué encaja" }
  ]
}
`;

  let text = "";

  try {
    const ai = getAI(app, { backend: new GoogleAIBackend() });
    const model = getGenerativeModel(ai, {
      model: "gemini-3.5-flash",
      generationConfig: {
        temperature: 0.35,
        responseMimeType: "application/json",
      },
    });

    if (model && typeof model.generateContent === "function") {
      const modelResult = await model.generateContent(prompt);
      text = modelResult.response.text();
    }
  } catch (error) {
    console.warn(
      "Firebase AI Logic no está disponible en este runtime.",
      error,
    );
  }

  if (!text && process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
    text = await generateWithRest(
      prompt,
      process.env.EXPO_PUBLIC_GEMINI_API_KEY,
    );
  }

  if (!text) {
    throw new Error(
      "Firebase AI Logic no está disponible. Configura App Check o EXPO_PUBLIC_GEMINI_API_KEY para Expo nativo.",
    );
  }

  const parsedResult = extractJson(text);

  return {
    message: parsedResult.message || "Estas mascotas podrían encajar contigo.",
    recommendations: Array.isArray(parsedResult.recommendations)
      ? parsedResult.recommendations
      : [],
  };
}
