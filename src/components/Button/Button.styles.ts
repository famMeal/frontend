import {
  alignItems,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadow,
  classnames,
  display,
  fontFamily,
  justifyContent,
  opacity,
  padding,
  position,
  textColor,
  width,
} from "tailwindcss-classnames";
import type { ButtonProps } from "./Button";

export const getCSS = ({
  theme,
  isOutlined,
  isLoading,
  isFullWidth,
  isFullyRounded,
  isClean,
}: ButtonProps) => {
  const themeButtonCSS = {
    primary: classnames(
      borderColor("border-primary"),
      backgroundColor(isOutlined ? "bg-white" : "bg-primary"),
    ),
    accent: classnames(
      borderColor("border-accent"),
      backgroundColor(isOutlined ? "bg-white" : "bg-accent"),
    ),
  };

  const buttonCSS = classnames(
    themeButtonCSS[theme],

    width(isFullWidth ? "w-full" : "w-auto"),
    position("relative"),
    justifyContent("justify-center"),
    alignItems("items-center"),
    borderRadius(isFullyRounded ? "rounded-full" : "rounded-lg"),
    boxShadow(isClean ? "shadow-none" : "shadow-md"),
    width("w-full"),
    display("inline-flex"),
    padding("px-4", isFullyRounded ? "py-4" : "py-2"),
    borderWidth(isClean ? "border-0" : "border-2"),
  );

  const themeTextCSS = {
    primary: classnames(textColor(isOutlined ? "text-primary" : "text-white")),
    accent: classnames(textColor(isOutlined ? "text-accent" : "text-white")),
  };

  const textCSS = classnames(
    themeTextCSS[theme],
    backgroundColor("bg-inherit"),
    opacity(isLoading ? "opacity-0" : "opacity-100"),
    fontFamily("font-khulaBold"),
  );

  const spinnerCSS = classnames(
    position("absolute"),
    display(isLoading ? "inline" : "hidden"),
  );

  return { buttonCSS, textCSS, spinnerCSS };
};
