import type { PropsWithChildren } from "react";
import { useState, type FC } from "react";
import { LayoutAnimation, Platform, UIManager } from "react-native";
import { AccordionContext } from "./AccordionContext";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(prev => !prev);
  };

  return (
    <AccordionContext.Provider value={{ isOpen, setIsOpen, toggleAccordion }}>
      {children}
    </AccordionContext.Provider>
  );
};

export { Accordion };
