import classnames, {
  alignItems,
  backgroundColor,
  display,
  height,
  inset,
  justifyContent,
  position,
  width,
} from "tailwindcss-classnames";

export const getCSS = () => {
  const container = classnames(
    backgroundColor("bg-accent"),
    width("w-full"),
    height("h-full"),
    position("relative"),
    display("flex"),
    justifyContent("justify-end"),
    alignItems("items-center"),
  );
  const wrapper = classnames(position("absolute"), inset("bottom-0", "left-0"));
  const childrenWrapper = classnames(
    position("absolute"),
    inset("bottom-0", "right-0"),
  );

  return { container, wrapper, childrenWrapper };
};
