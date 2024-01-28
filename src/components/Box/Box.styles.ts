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
import { BoxProps } from "./Box";

export const getCSS = ({ isPaddingLess }: BoxProps) => {
  const boxCSS = classnames(
    position("relative"),
    display("flex"),
    flexDirection("flex-col"),
    backgroundColor("bg-white"),
    overflow("overflow-hidden"),
    boxShadow("shadow-2xl"),
    borderRadius("rounded-lg"),
    width("w-full"),
    padding(isPaddingLess ? "p-0" : "p-4"),
    margin(isPaddingLess ? "m-0" : "mb-4", "last-of-type:mb-0"),
  );

  return { boxCSS };
};
