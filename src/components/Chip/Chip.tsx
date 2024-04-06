import { Typography } from "components/Typography";
import {
  BadgeCheckIcon,
  BadgeInfoIcon,
  BadgeXIcon,
  TagIcon,
} from "lucide-react-native";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";
import { getCSS } from "./Chip.styles";

export type ChipTypes = "error" | "warning" | "success" | "info" | "accent";
type ChipPositions = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface ChipProps {
  type: ChipTypes;
  position: ChipPositions;
  isStatic: boolean;
  icon?: ReactNode;
}

const icons = {
  error: <BadgeXIcon size={18} className="text-red-700 mr-1" />,
  success: <BadgeCheckIcon size={18} className="text-green-700 mr-1" />,
  warning: <BadgeInfoIcon size={18} className="text-yellow-700 mr-1" />,
  info: <TagIcon size={18} className="text-white mr-1" />,
  accent: <TagIcon size={18} className="text-white mr-1" />,
};

type Props = ViewProps & Partial<ChipProps>;

const Chip: FC<Props> = ({
  children,
  type = "success",
  position = "topLeft",
  isStatic = false,
  icon,
  ...rest
}) => {
  const { ChipCSS, textCSS } = useMemo(
    () => getCSS({ type, position, isStatic }),
    [type, position, isStatic]
  );

  const renderIcon = () => (icon === null ? null : icon || icons[type]);

  return (
    <View className={ChipCSS} {...rest}>
      {renderIcon()}
      <Typography isMarginless type="S" weigth="semiBold" className={textCSS}>
        {children}
      </Typography>
    </View>
  );
};

export { Chip };
