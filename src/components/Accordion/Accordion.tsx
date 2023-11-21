import type { PropsWithChildren } from "react";
import { useState, type FC } from "react";
import { LayoutAnimation } from "react-native";
import { AccordionContext } from "./AccordionContext";

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
