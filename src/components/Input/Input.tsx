import type { ColourTheme } from "constants/colours";
import type { FC } from "react";
import { useMemo } from "react";
import type { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { getCSS } from "./Input.styles";

export interface InputProps {
  theme: ColourTheme;
}

type Props = TextInputProps & Partial<InputProps>;

const Input: FC<Props> = ({ theme = "primary", ...rest }) => {
  const { inputCSS } = useMemo(() => getCSS({ theme }), [theme]);
  return <TextInput className={inputCSS} {...rest} />;
};

export { Input };
