import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IoniconName =
  | ComponentProps<typeof MaterialCommunityIcons>["name"]
  | ComponentProps<(typeof FontAwesome5)["name"]>;

type typeValue = "material" | "fontAwesome5";

interface CategoryModel {
  name: string;
  icon: IoniconName;
  type: typeValue;
}

export const petCategories: CategoryModel[] = [
  { name: "Gato", icon: "cat", type: "fontAwesome5" },
  { name: "Perro", icon: "dog", type: "fontAwesome5" },
  { name: "Ave", icon: "bird", type: "material" },
  { name: "Conejo", icon: "rabbit", type: "material" },
];
