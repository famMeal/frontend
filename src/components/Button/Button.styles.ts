import { Platform } from "react-native";
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

interface Props extends ButtonProps {
  disabled?: boolean;
}

export const getCSS = ({
  disabled,
  theme,
  isOutlined,
  isLoading,
  isFullWidth,
  isFullyRounded,
  isClean,
}: Props) => {
  const themeButtonCSS = {
    primary: classnames(
      borderColor(disabled ? "border-gray-400" : "border-primary"),
      backgroundColor(
        disabled ? "bg-gray-400" : isOutlined ? "bg-white" : "bg-primary"
      )
    ),
    accent: classnames(
      borderColor(disabled ? "border-gray-400" : "border-accent"),
      backgroundColor(
        disabled ? "bg-gray-400" : isOutlined ? "bg-white" : "bg-accent"
      )
    ),
    error: classnames(
      borderColor(disabled ? "border-gray-400" : "border-red-700"),
      backgroundColor(
        disabled ? "bg-gray-400" : isOutlined ? "bg-white" : "bg-red-700"
      )
    ),
  };

  const paddingStyles = classnames(
    padding("pb-1", disabled ? "pt-2" : isOutlined ? "pt-2" : "pt-2")
  );

  const androidPadding = classnames(
    padding("pb-2", disabled ? "pt-2" : isOutlined ? "pt-2" : "pt-2")
  );

  const buttonCSS = classnames(
    themeButtonCSS[theme],
    width(isFullWidth ? "w-full" : "w-auto"),
    position("relative"),
    justifyContent("justify-center"),
    alignItems("items-center"),
    borderRadius(isFullyRounded ? "rounded-full" : "rounded-lg"),
    boxShadow(isClean ? "shadow-none" : "shadow-md"),
    width("w-full"),
    display("flex"),
    padding(
      "px-4",
      isFullyRounded
        ? "py-4"
        : Platform.OS === "android"
        ? androidPadding
        : paddingStyles
    ),
    borderWidth(isClean ? "border-0" : "border-2")
  );

  const themeTextCSS = {
    primary: classnames(
      textColor(
        disabled ? "text-white" : isOutlined ? "text-primary" : "text-white"
      )
    ),
    accent: classnames(
      textColor(
        disabled ? "text-white" : isOutlined ? "text-accent" : "text-white"
      )
    ),
    error: classnames(
      textColor(
        disabled ? "text-white" : isOutlined ? "text-red-700" : "text-white"
      )
    ),
  };

  const textCSS = classnames(
    themeTextCSS[theme],
    backgroundColor("bg-inherit"),
    opacity(isLoading ? "opacity-0" : "opacity-100"),
    fontFamily("font-khulaBold")
  );

  const spinnerCSS = classnames(
    position("absolute"),
    display(isLoading ? "inline" : "hidden")
  );

  return { buttonCSS, textCSS, spinnerCSS };
};
