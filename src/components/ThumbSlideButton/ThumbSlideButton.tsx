import { COLOURS } from "constants/colours";
import { ChevronRightIcon } from "lucide-react-native";
import type { FC } from "react";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  onSlideComplete: () => void;
  loading?: boolean;
  isCompleted?: boolean;
}

const { width: screenWidth } = Dimensions.get("window");

const ThumbSlideButton: FC<Props> = ({
  onSlideComplete,
  loading = false,
  isCompleted = false,
}) => {
  const slideProgress = useRef(new Animated.Value(0)).current; // Using useRef to persist the animated value

  useEffect(() => {
    if (isCompleted) {
      Animated.spring(slideProgress, {
        toValue: screenWidth,
        useNativeDriver: false,
      }).start();
    }
  }, [isCompleted, slideProgress]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !loading && !isCompleted,
    onPanResponderMove: Animated.event([null, { dx: slideProgress }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (!isCompleted && gestureState.dx >= screenWidth * 0.8) {
        onSlideComplete();
      } else {
        Animated.spring(slideProgress, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedButtonStyle = {
    transform: [
      {
        translateX: slideProgress.interpolate({
          inputRange: [0, screenWidth],
          outputRange: [0, screenWidth - 70], // Subtract the thumb width to prevent overflow
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const renderIcon = () =>
    loading ? (
      <ActivityIndicator size="large" color={COLOURS.primary} />
    ) : (
      <ChevronRightIcon color={COLOURS.accent} />
    );

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[animatedButtonStyle, styles.thumb]}>
        {renderIcon()}
      </Animated.View>
      <Text style={styles.text}>
        {isCompleted ? "Completed!" : "Slide to pickup"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLOURS.accent,
    backgroundColor: COLOURS.accent,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    width: "100%", // full width
    minHeight: 55, // Make sure the button has height even when empty
  },
  thumb: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: COLOURS.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    position: "absolute",
    zIndex: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Khula-Bold",
    color: COLOURS.white,
  },
});

export { ThumbSlideButton };
