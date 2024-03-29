import { Button, Typography } from "components";
import { COLOURS } from "constants/colours";
import type { PropsWithChildren } from "react";
import React, { type FC } from "react";
import { StatusBar, View } from "react-native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import { getCSS } from "./Header.styles";

interface Props extends Partial<PropsWithChildren> {
  title: string;
  onBackButtonPress?: () => void;
}

const Header: FC<Props> = ({ children, title, onBackButtonPress }) => {
  const { container, wrapper, childrenWrapper } = getCSS();

  const renderBackButton = () =>
    onBackButtonPress ? (
      <View className={wrapper}>
        <Button isOutlined isFullyRounded isClean onPress={onBackButtonPress}>
          <ArrowLeftCircleIcon color={COLOURS.accent} size={30} />
        </Button>
      </View>
    ) : null;

  const renderChildren = () =>
    children ? <View className={childrenWrapper}>{children}</View> : null;
  return (
    <View className={container}>
      {renderBackButton()}
      {renderChildren()}
      <StatusBar backgroundColor={COLOURS.white} barStyle="light-content" />
      <Typography type="H3" weigth="bold" colour="accent">
        {title}
      </Typography>
    </View>
  );
};
export { Header };
