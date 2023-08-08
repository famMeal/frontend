import type { FC } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import type { ColourTheme } from 'constants/colours';
import { useMemo } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Typography } from 'components/Typography';
import { COLOURS } from 'constants/colours';
import { getCSS } from './Button.styles';

type PrimaryAccentTheme<T> = T extends keyof typeof COLOURS
  ? T extends 'primary' | 'accent'
    ? T
    : never
  : never;

type ButtonThemes = PrimaryAccentTheme<ColourTheme>;

export interface ButtonProps {
  theme: ButtonThemes;
  isOutlined: boolean;
  isLoading: boolean;
  isFullWidth: boolean;
  isFullyRounded: boolean;
  isClean: boolean;
}

type Props = TouchableOpacityProps & Partial<ButtonProps>;

const Button: FC<Props> = ({
  children,
  theme = 'primary',
  isLoading = false,
  isOutlined = false,
  isFullWidth = false,
  isFullyRounded = false,
  isClean = false,
  ...rest
}) => {
  const { buttonCSS, textCSS, spinnerCSS } = useMemo(
    () =>
      getCSS({
        theme,
        isOutlined,
        isLoading,
        isFullWidth,
        isFullyRounded,
        isClean,
      }),
    [isLoading, theme, isOutlined, isFullWidth, isFullyRounded],
  );

  const renderContent = () =>
    isFullyRounded ? (
      children
    ) : (
      <Typography className={textCSS}>{children}</Typography>
    );

  return (
    <TouchableOpacity className={buttonCSS} {...rest}>
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
