import { Typography } from "components/Typography";
import { FC, useMemo } from "react";
import { View, ViewProps } from "react-native";
import { getCSS } from "./Chip.styles";

type ChipTypes = "error" | "primary" | "success" | "accent";
type ChipPositions = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface ChipProps {
  type: ChipTypes;
  position: ChipPositions;
}

type Props = ViewProps & Partial<ChipProps>;

const Chip: FC<Props> = ({
  children,
  type = "primary",
  position = "topLeft",
  ...rest
}) => {
  const { ChipCSS, textCSS } = useMemo(
    () => getCSS({ type, position }),
    [type, position],
  );
  return (
    <View className={ChipCSS} {...rest}>
      <Typography isMarginless type="S" weigth="semiBold" className={textCSS}>
        {children}
      </Typography>
    </View>
  );
};

export { Chip };