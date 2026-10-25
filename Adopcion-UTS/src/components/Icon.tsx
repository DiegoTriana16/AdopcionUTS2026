import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";


type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"]
type FontAwesome5IconName = ComponentProps<(typeof FontAwesome5)["name"]>;

interface IconProps {
  type: "material" | "fontAwesome5";
  name: MaterialIconName | FontAwesome5IconName;
  size?: number;
  color?: string;
}
const Icon = ({
  type,
  name,
  size = 24,
  color = "#000",
}: IconProps) => {
  if (type === "material") {
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
      />
    );
  }

  return (
    <FontAwesome5
      name={name as MaterialIconName}
      size={size}
      color={color}
    />
  );
}

export default Icon;