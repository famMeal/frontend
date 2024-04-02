import { type FC, type PropsWithChildren } from "react";
import { View } from "react-native";
import { useAccordionContext } from "./AccordionContext";

const AccordionContent: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen } = useAccordionContext();

  const renderContent = () => (isOpen ? <View>{children}</View> : null);

  return renderContent();
};

export { AccordionContent };
