import type { FC } from "react";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { getCSS } from "./Skeleton.styles";

type Size = "small" | "medium" | "large";
type Width = "full" | "half";

export interface Props {
  size?: Size;
  width?: Width;
  isFullyRounded?: boolean;
}

const Skeleton: FC<Props> = ({
  isFullyRounded = false,
  size = "medium",
  width = "half",
}) => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;
  const { container, wrapper } = getCSS({ size, isFullyRounded });

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };

  useEffect(() => {
    circleAnimated();
  }, []);

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      -10,
      width === "full"
        ? Dimensions.get("window").width - 20
        : Dimensions.get("window").width / 2 - 20,
    ],
  });

  return (
    <View className={container}>
      <View className={wrapper}>
        <Animated.View
          style={{ transform: [{ translateX }] }}
          className="bg-white opacity-50"
        />
      </View>
    </View>
  );
};

export { Skeleton };
