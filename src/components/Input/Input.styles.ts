import classnames, {
  borderColor,
  width,
  fontFamily,
  fontSize,
  borderRadius,
  padding,
  borderWidth,
} from "tailwindcss-classnames";
import type { InputProps } from "./Input";

export const getCSS = ({ theme }: InputProps) => {
  const themeInputCSS = {
    primary: classnames(borderColor("border-primary")),
    accent: classnames(borderColor("border-accent")),
  };

  const inputCSS = classnames(
    themeInputCSS[theme],
    width("w-full"),
    fontFamily("font-khula"),
    fontSize("text-lg"),
    borderRadius("rounded-lg"),
    padding("px-6", "py-3"),
    borderWidth("border-2")
  );
  return { inputCSS };
};
