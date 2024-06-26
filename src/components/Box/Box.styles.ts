import classnames, {
  backgroundColor,
  borderRadius,
  boxShadow,
  display,
  flexDirection,
  margin,
  overflow,
  padding,
  position,
  width,
} from "tailwindcss-classnames";
import type { BoxProps } from "./Box";

export const getCSS = ({ isPaddingLess }: BoxProps) => {
  const boxCSS = classnames(
    position("relative"),
    display("flex"),
    flexDirection("flex-col"),
    backgroundColor("bg-white"),
    overflow("overflow-hidden"),
    boxShadow("2xl:shadow-xl"),
    borderRadius("rounded-2xl"),
    width("w-full"),
    padding(isPaddingLess ? "p-0" : "p-4"),
    margin(isPaddingLess ? "m-0" : "mb-4", "last-of-type:mb-0")
  );

  return { boxCSS };
};
