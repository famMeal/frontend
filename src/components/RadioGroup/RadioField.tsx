import { styled } from "nativewind";
import type { FC, PropsWithChildren } from "react";
import React from "react";
import { TouchableOpacity, View } from "react-native";

interface Props extends PropsWithChildren {
  isSelected?: boolean;
  onSelect?: (value: string) => void;
  value: string;
}

const StyledRadioField: FC<Props> = ({
  onSelect,
  children,
  value,
  isSelected,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect?.(value)}
      className={`my-2 w-full flex flex-row items-center p-4 border rounded-md  ${
        isSelected ? "border-accent border-2" : "border-gray-300 bg-white"
      }`}>
      <View
        className={`h-6 w-6 rounded-full border flex items-center justify-center ${
          isSelected ? "border-2 border-accent" : "border-gray-300 bg-white"
        }`}>
        {isSelected && <View className="h-3 w-3 rounded-full bg-accent" />}
      </View>
      <View className="ml-4">{children}</View>
    </TouchableOpacity>
  );
};

const RadioField = styled<Props>(StyledRadioField);
export { RadioField };
