import { Typography } from "components/Typography";
import type { FC } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  value: string;
  isSelected?: boolean;
  onSelect?: (value: string) => void;
  isLoading?: boolean;
}

const RadioButton: FC<Props> = ({
  label,
  value,
  isSelected,
  onSelect,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`p-2 border-2 rounded-md mr-2 ${
        isSelected ? "bg-accent border-accent" : "border-gray-400"
      }`}
      onPress={() => onSelect?.(value)}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Typography
          isMarginless
          weigth="bold"
          className={`${isSelected ? "text-white" : "text-gray-700"}`}>
          {label}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export { RadioButton };
export type { Props as RadioButtonProps };
