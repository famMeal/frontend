import { COLOURS } from "constants/colours";
import { ChevronRightIcon } from "lucide-react-native";
import React, { useEffect } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  onSlideComplete: () => void;
  loading?: boolean;
  isCompleted?: boolean;
}

const { width: screenWidth } = Dimensions.get("window");

const ThumbSlideButton: React.FC<Props> = ({
  onSlideComplete,
  loading = false,
  isCompleted = false,
}) => {
  const slideProgress = useSharedValue(0);
  const maxSlideDistance = screenWidth - 50;

  useEffect(() => {
    if (isCompleted) {
      slideProgress.value = withSpring(maxSlideDistance);
    }
  }, [isCompleted]);

  const panGesture = Gesture.Pan()
    .enabled(!isCompleted)
    .onUpdate(event => {
      if (!loading && !isCompleted) {
        const translationX = Math.min(maxSlideDistance, event.translationX);
        slideProgress.value = translationX;
      }
    })
    .onEnd(() => {
      if (
        slideProgress.value >= maxSlideDistance * 0.8 &&
        !isCompleted &&
        !loading
      ) {
        runOnJS(onSlideComplete)();
        slideProgress.value = withSpring(maxSlideDistance);
      } else {
        slideProgress.value = withSpring(0);
      }
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideProgress.value }],
  }));

  const backgroundColorInterpolate = useAnimatedStyle(() => ({
    backgroundColor:
      slideProgress.value >= maxSlideDistance * 0.8
        ? COLOURS.primary
        : COLOURS.accent,
  }));

  const renderText = () =>
    loading ? (
      <ActivityIndicator color={COLOURS.white} />
    ) : (
      <Text style={styles.text}>
        {isCompleted ? "Picked up!" : "Slide to pickup"}
      </Text>
    );

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, backgroundColorInterpolate]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]}>
          <ChevronRightIcon color={COLOURS.accent} />
        </Animated.View>
        {renderText()}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    width: "100%",
    minHeight: 55,
    paddingHorizontal: 10,
  },
  thumb: {
    shadowColor: COLOURS.primary,
    elevation: 10,
    height: 55,
    width: 55,
    borderWidth: 3,
    borderColor: COLOURS.light,
    borderRadius: 25,
    backgroundColor: COLOURS.white,
    justifyContent: "center",
    alignItems: "center",
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
