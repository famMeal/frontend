import type { DimensionValue } from "react-native";
import classnames, { flexBox, margin } from "tailwindcss-classnames";
import type { ColumnProps } from "./Column";

export const getCSS = ({
  alignItems = "flex-start",
  justifyContent = "flex-start",
  columnWidth = "half",
  isLastColumn,
  parentWidth = 0,
}: ColumnProps) => {
  const marginRight = 16;
  let widthFraction;

  switch (columnWidth) {
    case "fullWidth":
      widthFraction = 1;
      break;
    case "oneThird":
      widthFraction = 1 / 3;
      break;
    case "twoThird":
      widthFraction = 2 / 3;
      break;
    case "oneQuarter":
      widthFraction = 1 / 4;
      break;
    case "half":
      widthFraction = 1 / 2;
      break;
    default:
      widthFraction = 1;
      break;
  }

  let columnWidthInPixels = parentWidth * widthFraction;

  if (!isLastColumn) {
    columnWidthInPixels -= marginRight;
  }

  let widthPercentage = (columnWidthInPixels / parentWidth) * 100;

  const width = { width: `${widthPercentage}%` as DimensionValue };

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

  const marginClass = isLastColumn ? margin("mr-0") : margin("mr-4");

  const columnCSS = classnames(
    alignClass[alignItems],
    justifyClass[justifyContent],
    marginClass,
  );

  return { columnCSS, width };
};
