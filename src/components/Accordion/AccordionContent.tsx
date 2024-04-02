import { useCallback, type FC, type PropsWithChildren } from "react";
import { View } from "react-native";
import { useAccordionContext } from "./AccordionContext";

const AccordionContent: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen } = useAccordionContext();

  const renderContent = useCallback(
    () => (isOpen ? <View>{children}</View> : null),
    [isOpen]
  );
  return renderContent();
};

export { AccordionContent };
