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
  columnWidth?: ColumnWidth;
  parentWidth?: number;
  direction: "row" | "column";
}
type Props = ViewProps & Partial<ColumnProps>;

const Column: FC<Props> = ({
  children,
  alignItems,
  justifyContent,
  numOfColumns,
  isLastColumn = false,
  columnWidth = "half",
  parentWidth,
  direction = "column",
  ...rest
}) => {
  const { columnCSS, width } = useMemo(
    () =>
      getCSS({
        alignItems,
        justifyContent,
        numOfColumns,
        isLastColumn,
        columnWidth,
        parentWidth,
        direction,
      }),
    [
      alignItems,
      justifyContent,
      numOfColumns,
      isLastColumn,
      columnWidth,
      parentWidth,
    ],
  );

  return (
    <View className={columnCSS} style={width} {...rest}>
      {children}
    </View>
  );
};

export { Column };
