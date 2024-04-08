import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Typography } from "components/Typography";
import { COLOURS } from "constants/colours";
import { XCircleIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import type { BaseToastProps } from "react-native-toast-message";
import Toast from "react-native-toast-message";

const renderToast = (backgroundColor: string, text1: string) => (
  <View
    style={{
      position: "relative",
      height: "auto",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    }}>
    <Columns className="w-2/4 mt-4">
      <Column
        columnWidth="fullWidth"
        justifyContent="center"
        alignItems="center">
        <Typography
          className="text-center"
          weigth="bold"
          type="S"
          style={{ color: COLOURS.white }}>
          {text1}
        </Typography>
      </Column>
    </Columns>
    <TouchableOpacity
      onPress={() => Toast.hide()}
      style={{ position: "absolute", right: 16 }}>
      <XCircleIcon color={COLOURS.white} />
    </TouchableOpacity>
  </View>
);

const toastConfig = {
  primary: ({ text1 }: BaseToastProps) => renderToast(COLOURS.primary, text1!),
  accent: ({ text1 }: BaseToastProps) => renderToast(COLOURS.accent, text1!),
  error: ({ text1 }: BaseToastProps) => renderToast(COLOURS.error, text1!),
};

const AppToast = () => <Toast config={toastConfig} />;

export { AppToast };
