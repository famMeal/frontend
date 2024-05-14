import { Typography } from "components/Typography";
import type { ColourTheme } from "constants/colours";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import type { TouchableOpacityProps } from "react-native";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { getCSS } from "./Button.styles";

type PrimaryAccentTheme<T> = T extends keyof typeof COLOURS
  ? T extends "primary" | "accent" | "error"
    ? T
    : never
  : never;

type ButtonThemes = PrimaryAccentTheme<ColourTheme>;

export interface ButtonProps {
  theme: ButtonThemes;
  isIcon: boolean;
  isOutlined: boolean;
  isLoading: boolean;
  isFullWidth: boolean;
  isFullyRounded: boolean;
  isClean: boolean;
}

type Props = TouchableOpacityProps & Partial<ButtonProps>;

const Button: FC<Props> = ({
  disabled,
  children,
  theme = "primary",
  isIcon = false,
  isLoading = false,
  isOutlined = false,
  isFullWidth = false,
  isFullyRounded = false,
  isClean = false,
  ...rest
}) => {
  const { buttonCSS, textCSS, spinnerCSS } = getCSS({
    disabled,
    theme,
    isOutlined,
    isIcon,
    isLoading,
    isFullWidth,
    isFullyRounded,
    isClean,
  });

  const renderContent = () =>
    isFullyRounded || isIcon ? (
      children
    ) : (
      <Typography className={textCSS}>{children}</Typography>
    );

  return (
    <TouchableOpacity
      className={buttonCSS}
      disabled={disabled || isLoading}
      {...rest}>
      {renderContent()}
      <View className={spinnerCSS}>
        <ActivityIndicator
          color={isOutlined ? COLOURS[theme] : COLOURS.white}
        />
      </View>
    </TouchableOpacity>
  );
};

export { Button };
