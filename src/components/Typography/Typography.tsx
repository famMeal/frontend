import type { FC } from "react";
import { useMemo } from "react";
import type { TextProps } from "react-native";
import { Text } from "react-native";
import { getCSS } from "./Typography.styles";

type FontTypes = "H1" | "H2" | "H3" | "P" | "S";
type FontWeights = "bold" | "semiBold" | "base";
type FontColour = "black" | "accent" | "primary";

export interface TypographyProps {
  weigth: FontWeights;
  type: FontTypes;
  colour: FontColour;
  isMarginless: boolean;
}

type Props = TextProps & Partial<TypographyProps>;

const Typography: FC<Props> = ({
  children,
  weigth = "base",
  type = "P",
  colour = "black",
  isMarginless = false,
  ...rest
}) => {
  const { typographyCSS } = useMemo(
    () => getCSS({ weigth, type, isMarginless, colour }),
    [weigth, type, isMarginless, colour]
  );

  return (
    <Text
      textBreakStrategy="simple"
      style={{
        includeFontPadding: false,
      }}
      className={typographyCSS}
      {...rest}>
      {children}
    </Text>
  );
};

export { Typography };
