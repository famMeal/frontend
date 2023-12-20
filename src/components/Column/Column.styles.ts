import type { DimensionValue } from "react-native";
import type { ColumnProps } from "./Column";

export const getCSS = ({
  alignItems,
  justifyContent,
  numOfColumns,
  isLastColumn,
  columnWidth = "fullWidth",
  preserveFinalMargin,
}: ColumnProps) => {
  const remInPx = 16;
  const gapSizePx = 1 * remInPx;

  let widthFraction;
  switch (columnWidth) {
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
    case "fullWidth":
    default:
      widthFraction = 1;
      break;
  }

  const gapAdjustment = numOfColumns
    ? ((gapSizePx / remInPx) * (numOfColumns - 1)) / numOfColumns
    : 0;

  const widthPercent = widthFraction * 100 - gapAdjustment;

  const flexStyle = {
    flex: 0,
    width: `${widthPercent}%` as DimensionValue,
    marginRight:
      !preserveFinalMargin || isLastColumn
        ? 0
        : numOfColumns && numOfColumns > 1
        ? gapSizePx
        : 0,
  };

  const additionalStyles = {
    alignItems: alignItems,
    justifyContent: justifyContent,
  };

  const columnCSS = {
    ...flexStyle,
    ...additionalStyles,
  };

  return { columnCSS };
};
