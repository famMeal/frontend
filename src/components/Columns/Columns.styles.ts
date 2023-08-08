import classnames, {
  TArg,
  display,
  flexDirection,
  margin,
  width,
} from "tailwindcss-classnames";

import { ColumnsProps } from "./Columns";

const negativeMargins = "-mx-2" as TArg;

export const getCSS = ({ direction, isMarginless }: ColumnsProps) => {
  const columnsCSS = classnames(
    width("w-full"),
    margin(negativeMargins, isMarginless ? "mb-0" : "mb-2"),
    display("flex"),
    flexDirection("flex-row"),
    flexDirection(direction === "column" ? "flex-col" : "flex-row")
  );
  return { columnsCSS };
};
