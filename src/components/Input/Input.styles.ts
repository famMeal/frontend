import classnames, {
  borderColor,
  borderRadius,
  borderWidth,
  fontFamily,
  fontSize,
  padding,
  width,
} from "tailwindcss-classnames";
import type { InputProps } from "./Input";

export const getCSS = ({ theme }: InputProps) => {
  const themeInputCSS = {
    primary: classnames(borderColor("border-primary")),
    accent: classnames(borderColor("border-accent")),
    light: null,
    white: null,
  };

  const inputCSS = classnames(
    themeInputCSS[theme],
    width("w-full"),
    fontFamily("font-khula"),
    fontSize("text-lg"),
    borderRadius("rounded-lg"),
    padding("pl-2", "pr-6", "py-2"),
    borderWidth("border-2"),
  );
  return { inputCSS };
};
