import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface AccordionContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  toggleAccordion: () => void;
}

const AccordionContext = createContext<AccordionContext | null>(null);
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (context === null) {
    throw new Error("useAccordionContext is not being used within a provider");
  }
  return context;
};

export { AccordionContext, useAccordionContext };
