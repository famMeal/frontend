import type { ColumnProps } from "./Column";
import classnames, {
  TArg,
  alignItems,
  display,
  flexBox,
  flexDirection,
  flexShrink,
  justifyContent,
  margin,
  padding,
} from "tailwindcss-classnames";

const negativePadding = "-px-2" as TArg;

export const getCSS = ({ flex, isPaddingless }: ColumnProps) => {
  const flexCSS = {
    grow: flexBox("grow"),
    one: flexBox("flex-1"),
    auto: flexBox("flex-auto"),
    shrink: flexShrink("shrink"),
  };

  const columnCSS = classnames(
    margin("ml-4"),
    padding(isPaddingless ? "p-0" : "p-4", negativePadding),
    display("flex"),
    flexDirection("flex-col"),
    flexCSS[flex]
  );

  return { columnCSS };
};
