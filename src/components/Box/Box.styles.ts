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

export const getCSS = () => {
  const boxCSS = classnames(
    position("relative"),
    display("flex"),
    flexDirection("flex-col"),
    backgroundColor("bg-white"),
    overflow("overflow-hidden"),
    boxShadow("shadow-2xl"),
    borderRadius("rounded-lg"),
    width("w-full"),
    padding("p-4"),
    margin("mb-4", "last-of-type:mb-0")
  );

  return { boxCSS };
};
