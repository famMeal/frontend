import type { FC } from "react";
import type { ViewProps } from "react-native";
import { useMemo } from "react";
import { View } from "react-native";
import { getCSS } from "./Column.styles";

type FlexTypes = "grow" | "one" | "auto" | "shrink";

export interface ColumnProps {
  flex: FlexTypes;
  isPaddingless: boolean;
}

type Props = ViewProps & Partial<ColumnProps>;

const Column: FC<Props> = ({
  children,
  flex = "grow",
  isPaddingless = false,
  ...rest
}) => {
  const { columnCSS } = useMemo(
    () => getCSS({ flex, isPaddingless }),
    [flex, isPaddingless]
  );
  return (
    <View className={columnCSS} {...rest}>
      {children}
    </View>
  );
};

export { Column };
