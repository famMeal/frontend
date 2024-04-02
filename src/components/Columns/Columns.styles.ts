import classnames, {
  display,
  flexDirection,
  margin,
  width,
} from "tailwindcss-classnames";

import type { ColumnsProps } from "./Columns";

export const getCSS = ({ direction, isMarginless }: ColumnsProps) => {
  const columnsCSS = classnames(
    width("w-full"),
    margin(isMarginless ? "mb-0" : "mb-4"),
    display("flex"),
    flexDirection(direction === "column" ? "flex-col" : "flex-row")
  );
  return { columnsCSS };
};
