import type { FC } from "react";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
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
  const { columnsCSS } = useMemo(
    () => getCSS({ direction, isMarginless }),
    [direction],
  );
  return (
    <View className={columnsCSS} {...rest}>
      {children}
    </View>
  );
};

export { Columns };
