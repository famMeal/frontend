import type { FC } from "react";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import { getCSS } from "./Column.styles";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems = "flex-start" | "flex-end" | "center" | "stretch";

export type ColumnWidth =
  | "fullWidth"
  | "oneThird"
  | "twoThird"
  | "oneQuarter"
  | "half";

export interface ColumnProps {
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  isPaddingless?: boolean;
  numOfColumns?: number;
  isLastColumn?: boolean;
  preserveFinalMargin?: boolean;
  columnWidth?: ColumnWidth;
}
type Props = ViewProps & Partial<ColumnProps>;

const Column: FC<Props> = ({
  children,
  alignItems,
  justifyContent,
  numOfColumns,
  isLastColumn = false,
  preserveFinalMargin = false,
  columnWidth = "half",
}) => {
  const { columnCSS } = useMemo(
    () =>
      getCSS({
        alignItems,
        justifyContent,
        numOfColumns,
        isLastColumn,
        columnWidth,
        preserveFinalMargin,
      }),
    [
      alignItems,
      justifyContent,
      numOfColumns,
      isLastColumn,
      columnWidth,
      preserveFinalMargin,
    ],
  );

  return <View style={{ ...columnCSS }}>{children}</View>;
};

export { Column };
