import { COLOURS } from "constants/colours";
import { ChevronRightIcon } from "lucide-react-native";
import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { Animated, View } from "react-native";
import { useAccordionContext } from "./AccordionContext";

const AccordionHeader: FC<PropsWithChildren> = ({ children }) => {
  const { toggleAccordion, isOpen } = useAccordionContext();

  const rotateAnim = new Animated.Value(isOpen ? 0 : -1);

  const rotation = rotateAnim.interpolate({
    inputRange: [-1, 0],
    outputRange: ["0deg", "90deg"],
  });

  const animateIcon = () => {
    Animated.spring(rotateAnim, {
      toValue: isOpen ? 0 : -1,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animateIcon();
  }, [isOpen]);

  const renderIcon = () => {
    return (
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <ChevronRightIcon width={14} height={14} color={COLOURS.white} />
      </Animated.View>
    );
  };

  return (
    <View onTouchEnd={toggleAccordion}>
      {children}
      <View className="absolute top-0 right-0 p-2 bg-accent rounded-full">
        {renderIcon()}
      </View>
    </View>
  );
};

export { AccordionHeader };
