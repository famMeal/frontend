import classnames, {
  backgroundColor,
  borderRadius,
  flex,
  justifyContent,
  padding,
} from "tailwindcss-classnames";

export const getCSS = () => {
  const container = classnames(flex("flex-1"), justifyContent("justify-end"));
  const overlay = classnames(flex("flex-1"));
  const content = classnames(
    backgroundColor("bg-white"),
    padding("p-4"),
    borderRadius("rounded-tl-2xl", "rounded-tr-2xl")
  );
  return {
    container,
    overlay,
    content,
  };
};
