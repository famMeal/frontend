import type { FC } from "react";
import { SafeAreaView } from "react-native";
import type { SafeAreaViewProps } from "react-native-safe-area-context";
import { getCSS } from "./Container.styles";

type Props = SafeAreaViewProps;

const Container: FC<Props> = ({ children, ...rest }) => {
  const { flexCSS } = getCSS();
  return (
    <SafeAreaView className={flexCSS} {...rest}>
      {children}
    </SafeAreaView>
  );
};

export { Container };
