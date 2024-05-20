import type { ColourTheme } from "constants/colours";
import React, { forwardRef, useMemo } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { getCSS } from "./Input.styles";

export interface InputProps {
  theme: ColourTheme;
  inputWidth?: "full" | "fixed";
}

type Props = TextInputProps & Partial<InputProps>;

const Input = forwardRef<TextInput, Props>(
  ({ theme = "primary", inputWidth = "full", ...rest }, ref) => {
    const { inputCSS } = useMemo(
      () => getCSS({ theme, inputWidth }),
      [theme, inputWidth]
    );

    return <TextInput className={inputCSS} ref={ref} {...rest} />;
  }
);

export { Input };
