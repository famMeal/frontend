import { Typography } from "components/Typography";
import type { FC, PropsWithChildren } from "react";
import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { getCSS } from "./SlideButton.styles";

interface Props extends PropsWithChildren {
  onSlideComplete?: () => void;
  onCompletedText?: string;
}

const primaryColor = "#CA752B";
const accentColor = "#1E463F";

const SlideButton: FC<Props> = ({
  onSlideComplete,
  children,
  onCompletedText,
}) => {
  const { button, container } = getCSS();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(false);

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [primaryColor, accentColor],
  });

  const handleSlideStart = () => {
    setIsCompleted(false); // Reset completion state
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleSlideComplete = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onSlideComplete?.();
      setIsCompleted(true); // Set completion state
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <TouchableOpacity
      onPressIn={handleSlideStart}
      onPressOut={handleSlideComplete}>
      <Animated.View className={button} style={{ backgroundColor }}>
        <Animated.View
          className={container}
          style={{
            transform: [{ translateX: slideAnim }],
          }}>
          <Typography className="text-white text-center" weigth="bold" type="S">
            {isCompleted && onCompletedText ? onCompletedText : children}
          </Typography>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export { SlideButton };
