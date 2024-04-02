import type { ColumnProps } from "components/Column";
import { Column } from "components/Column";
import type { FC } from "react";
import {
  Children,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from "react";
import type { LayoutChangeEvent, ViewProps } from "react-native";
import { View } from "react-native";
import { getCSS } from "./Columns.styles";

type Directon = "row" | "column";

export interface ColumnsProps {
  direction: Directon;
  isMarginless: boolean;
}

type Props = ViewProps & Partial<ColumnsProps>;

const Columns: FC<Props> = ({
  children,
  direction = "row",
  isMarginless = false,
  ...rest
}) => {
  const [parentWidth, setParentWidthWidth] = useState(0);

  const { columnsCSS } = useMemo(
    () => getCSS({ direction, isMarginless }),
    [direction, isMarginless]
  );

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setParentWidthWidth(width);
  };

  const numOfColumns = Children.toArray(children).filter(
    child => isValidElement<ColumnProps>(child) && child.type === Column
  ).length;

  const childrenWithCount = Children.map(children, (child, index) => {
    const isLastColumn = index === numOfColumns - 1;

    return isValidElement<ColumnProps>(child) && child.type === Column
      ? cloneElement(child, {
          numOfColumns,
          isLastColumn,
          parentWidth,
        })
      : child;
  });

  return (
    <View onLayout={onLayout} className={columnsCSS} {...rest}>
      {childrenWithCount}
    </View>
  );
};

export { Columns };
