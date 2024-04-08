import { Typography } from "components/Typography";
import type { FC } from "react";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface Props {
  label: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

const RadioButton: FC<Props> = ({ label, value, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      className={`p-2 border rounded-lg mr-2 ${
        isSelected ? "bg-accent border-accent" : "border-gray-400"
      }`}
      onPress={() => onSelect(value)}>
      <Typography
        weigth="bold"
        className={`${isSelected ? "text-white" : "text-gray-700"}`}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

interface RadioGroupProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup: FC<RadioGroupProps> = ({
  options,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View className="flex-row justify-evenly items-center">
      {options.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          isSelected={selectedValue === option.value}
          onSelect={onValueChange}
        />
      ))}
    </View>
  );
};

export { RadioGroup };
