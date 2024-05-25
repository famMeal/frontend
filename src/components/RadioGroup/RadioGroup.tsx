import type { FC, PropsWithChildren } from "react";
import React, { Children, cloneElement, isValidElement } from "react";
import { View } from "react-native";
import classnames from "tailwindcss-classnames";
import type { RadioButtonProps } from "./RadioButton";
import { getRadioGroupStyles } from "./RadioGroup.styles";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems = "flex-start" | "flex-end" | "center" | "stretch";

export interface Props extends PropsWithChildren {
  direction?: "row" | "column";
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup: FC<Props> = ({
  children,
  selectedValue,
  onValueChange,
  direction = "row",
  alignItems = "flex-start",
  justifyContent = "flex-start",
}) => {
  const styles = getRadioGroupStyles({ direction, justifyContent, alignItems });
  const classNames = classnames(styles);

  const childrenWithProps = Children.map(children, child => {
    return isValidElement<RadioButtonProps>(child)
      ? cloneElement(child, {
          isSelected: child.props.value === selectedValue,
          onSelect: onValueChange,
        })
      : child;
  });

  return <View className={classNames}>{childrenWithProps}</View>;
};

export { RadioGroup };
