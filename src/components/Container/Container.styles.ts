import classnames, { flexBox, margin, padding } from "tailwindcss-classnames";

export const getCSS = () => {
  const flexCSS = classnames(flexBox("flex-1"), padding("p-0"), margin("m-0"));

  return { flexCSS };
};
