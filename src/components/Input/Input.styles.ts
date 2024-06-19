import { Platform } from "react-native";
import classnames, {
  borderColor,
  borderRadius,
  borderWidth,
  fontFamily,
  fontSize,
  padding,
  textAlign,
  width,
} from "tailwindcss-classnames";
import type { InputProps } from "./Input";

export const getCSS = ({ theme, inputWidth }: InputProps) => {
  const themeInputCSS = {
    primary: classnames(borderColor("border-primary")),
    accent: classnames(borderColor("border-accent")),
    light: null,
    white: null,
    error: null,
  };

  const inputCSS = classnames(
    textAlign(inputWidth === "fixed" ? "text-center" : "text-left"),
    themeInputCSS[theme],
    width(inputWidth === "full" ? "w-full" : "w-10"),
    fontFamily("font-khula"),
    fontSize("text-lg"),
    borderRadius("rounded-md"),
    padding(
      inputWidth === "fixed" ? null : "pl-2",
      Platform.OS === "ios" ? "py-1.5" : "py-2"
    ),
    borderWidth("border-2")
  );
  return { inputCSS };
};
