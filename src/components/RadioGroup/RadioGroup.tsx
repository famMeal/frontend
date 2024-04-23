import type { FC, ReactElement } from "react";
import React, { Children, cloneElement } from "react";
import { View } from "react-native";

interface RadioGroupProps {
  children: ReactElement[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({
  children,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="flex-row justify-evenly items-center">
      {Children.map(children, child =>
        cloneElement(child, {
          isSelected: child.props.value === selectedValue,
          onSelect: onValueChange,
        })
      )}
    </View>
  );
};

export { RadioGroup };
