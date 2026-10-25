import { File } from "expo-file-system";

export const SubirImagen = async (
  path: string,
  userId: string,
): Promise<string> => {
  const formData = new FormData();
  const file = new File(path);

  formData.append("id", userId);
  formData.append("image", file);

  const response = await fetch(
    "https://food-widget-residual.ngrok-free.dev/images",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error subiendo imagen: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.url;
};
