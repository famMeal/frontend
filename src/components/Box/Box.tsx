import type { FC, PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { getCSS } from "./Box.styles";

type Props = PropsWithChildren & ViewProps;

const Box: FC<Props> = ({ children, ...rest }) => {
  const { boxCSS } = getCSS();
  return (
    <View className={boxCSS} {...rest}>
      {children}
    </View>
  );
};

export { Box };
