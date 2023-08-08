import type { TypographyProps } from "./Typography";
import classnames, {
  flexShrink,
  fontFamily,
  fontSize,
  height,
  lineHeight,
  margin,
  padding,
  textColor,
} from "tailwindcss-classnames";

export const getCSS = ({
  weigth,
  type,
  isMarginless,
  colour,
}: TypographyProps) => {
  const css = {
    black: textColor("text-black"),
    primary: textColor("text-primary"),
    accent: textColor("text-accent"),
    base: fontFamily("font-khula"),
    bold: fontFamily("font-khulaBold"),
    semiBold: fontFamily("font-khulaSemiBold"),
    H1: classnames(
      fontSize("text-4xl"),
      height("h-9"),
      padding("pt-2"),
      margin(isMarginless ? "mb-0" : "mb-6")
    ),
    H2: classnames(
      fontSize("text-3xl"),
      height("h-8"),
      lineHeight("leading-10"),
      margin(isMarginless ? "mb-0" : "mb-4")
    ),
    H3: classnames(
      fontSize("text-2xl"),

      margin(isMarginless ? "mb-0" : "mb-2")
    ),
    P: classnames(
      fontSize("text-lg"),
      height("h-6"),
      margin(isMarginless ? "mb-0" : "mb-1")
    ),
    S: classnames(
      fontSize("text-base"),
      margin("mt-1"),
      height("h-auto"),
      margin(isMarginless ? "mb-0" : "mb-1")
    ),
  };

  const typographyCSS = classnames(
    flexShrink("shrink"),
    css[colour],
    css[weigth],
    css[type]
  );

  return { typographyCSS };
};
