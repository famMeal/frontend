import type { ChipProps } from "./Chip";

import classnames, {
  alignItems,
  alignSelf,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  height,
  inset,
  justifyContent,
  lineHeight,
  margin,
  padding,
  position,
  textAlign,
  textColor,
  whitespace,
  width,
  zIndex,
} from "tailwindcss-classnames";

export const getCSS = ({
  type,
  position: chipPosition,
  isStatic,
}: ChipProps) => {
  const positionCSS = {
    topLeft: inset("left-4", "top-4"),
    topRight: inset("right-4", "top-4"),
    bottomLeft: inset("left-4", "bottom-4"),
    bottomRight: inset("right-4", "bottom-4"),
  };

  const themeCSS = {
    error: classnames(backgroundColor("bg-red-100")),
    success: classnames(backgroundColor("bg-green-100")),
    warning: classnames(backgroundColor("bg-yellow-100")),
    info: classnames(backgroundColor("bg-primary")),
    accent: classnames(backgroundColor("bg-accent")),
  };

  const textColourCSS = {
    error: classnames(textColor("text-red-700")),
    success: classnames(textColor("text-green-700")),
    warning: classnames(textColor("text-yellow-700")),
    info: classnames(textColor("text-white")),
    accent: classnames(textColor("text-white")),
  };

  const dotCSS = classnames(width("w-2"), height("h-2"), margin("mr-2"));

  const ChipCSS = classnames(
    display("flex"),
    flexDirection("flex-row"),
    justifyContent("justify-center"),
    alignItems("items-center"),
    alignSelf("self-center"),
    zIndex("z-10"),
    themeCSS[type],
    position(isStatic ? "static" : "absolute"),
    isStatic ? null : positionCSS[chipPosition],
    whitespace("whitespace-nowrap"),
    borderRadius("rounded-full"),
    padding("px-2", "py-0.5"),
    lineHeight("leading-none")
  );

  const textCSS = classnames(textColourCSS[type], textAlign("text-center"));
  return {
    ChipCSS,
    textCSS,
    dotCSS,
  };
};
