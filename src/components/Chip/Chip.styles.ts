import type { ChipProps } from "./Chip";

import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  inset,
  lineHeight,
  padding,
  position,
  textColor,
  textTransform,
  whitespace,
  width,
  zIndex,
} from "tailwindcss-classnames";

export const getCSS = ({ type, position: chipPosition }: ChipProps) => {
  const positionCSS = {
    topLeft: inset("left-6", "top-6"),
    topRight: inset("right-3", "top-3"),
    bottomLeft: inset("left-3", "bottom-3"),
    bottomRight: inset("right-3", "bottom-3"),
  };

  const themeCSS = {
    primary: classnames(backgroundColor("bg-primary")),
    accent: classnames(backgroundColor("bg-accent")),
    error: classnames(backgroundColor("bg-red-600")),
    success: classnames(backgroundColor("bg-green-600")),
    warning: classnames(backgroundColor("bg-yellow-600")),
  };

  const ChipCSS = classnames(
    zIndex("z-10"),
    themeCSS[type],
    position("absolute"),
    positionCSS[chipPosition],
    display("flex"),
    width("w-max"),
    flexDirection("flex-row"),
    whitespace("whitespace-nowrap"),
    borderRadius("rounded-full"),
    padding("px-3", "py-1"),
    lineHeight("leading-none"),
  );

  const textCSS = classnames(
    textColor("text-white"),
    textTransform("uppercase"),
  );
  return {
    ChipCSS,
    textCSS,
  };
};
