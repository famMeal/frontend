import type { FC, PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import { getCSS } from "./Box.styles";

interface Props extends PropsWithChildren, ViewProps {
  isPaddingLess?: boolean;
}

const Box: FC<Props> = ({ children, isPaddingLess, ...rest }) => {
  const { boxCSS } = getCSS({ isPaddingLess });
  return (
    <View className={boxCSS} {...rest}>
      {children}
    </View>
  );
};

export { Box };
export type { Props as BoxProps };
