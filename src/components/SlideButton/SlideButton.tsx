import { Typography } from "components/Typography";
import type { FC } from "react";
import React, { PropsWithChildren, useCallback, useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { getCSS } from "./SlideButton.styles";

interface Props extends PropsWithChildren {
  onSlideComplete?: () => void;
  onCompletedText?: string;
  completed?: boolean;
}

const primaryColor = "#CA752B";
const accentColor = "#1E463F";

const SlideButton: FC<Props> = ({
  onSlideComplete,
  children,
  onCompletedText,
  completed = false,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(completed);
  const { button, container } = getCSS({ isCompleted });

  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [primaryColor, accentColor] as [string, string],
  });

  const animateSlide = (toValue: number, onComplete?: () => void) => {
    Animated.timing(slideAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start(onComplete);
  };

  const handleSlideStart = () => {
    if (isCompleted) return null;
    setIsCompleted(false);
    animateSlide(100);
  };

  const handleSlideComplete = useCallback(() => {
    animateSlide(0, () => {
      onSlideComplete?.();
      setIsCompleted(true);
      Animated.timing(colorAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [onSlideComplete]);

  return (
    <TouchableOpacity
      disabled={isCompleted}
      className="w-full"
      onPressIn={handleSlideStart}
      onPressOut={handleSlideComplete}
      accessible
      accessibilityRole="button"
      accessibilityLabel="Slide to interact">
      <Animated.View className={button} style={{ backgroundColor }}>
        <Animated.View
          className={container}
          style={[
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}>
          <Typography className="text-white text-center" weigth="bold" type="S">
            {isCompleted && onCompletedText ? onCompletedText : children}
          </Typography>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export { SlideButton };
