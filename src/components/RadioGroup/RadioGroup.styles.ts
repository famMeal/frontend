import classnames, {
  flexBox,
  flexDirection,
  width,
} from "tailwindcss-classnames";
import type { Props } from "./RadioGroup";

export const getRadioGroupStyles = ({
  direction,
  justifyContent,
  alignItems,
}: Pick<Props, "direction" | "alignItems" | "justifyContent">) => {
  const alignClass = {
    "flex-start": flexBox("items-start"),
    "flex-end": flexBox("items-end"),
    center: flexBox("items-center"),
    stretch: flexBox("items-stretch"),
  };

  const justifyClass = {
    "flex-start": flexBox("justify-start"),
    "flex-end": flexBox("justify-end"),
    center: flexBox("justify-center"),
    "space-between": flexBox("justify-between"),
    "space-around": flexBox("justify-around"),
    "space-evenly": flexBox("justify-evenly"),
  };

  return classnames(
    width("w-full"),
    flexDirection(direction === "column" ? "flex-col" : "flex-row"),
    alignClass[alignItems!],
    justifyClass[justifyContent!]
  );
};
