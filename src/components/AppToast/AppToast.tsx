import { Typography } from "components/Typography";
import { COLOURS } from "constants/colours";
import { XCircleIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import type { BaseToastProps } from "react-native-toast-message";
import Toast from "react-native-toast-message";

const toastConfig = {
  primary: ({ text1 }: BaseToastProps) => (
    <View
      style={{
        position: "relative",
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLOURS?.primary,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}>
      <Typography weigth="bold" type="S" className="text-white">
        {text1}
      </Typography>
      <TouchableOpacity
        onPress={() => Toast.hide()}
        className="absolute right-4">
        <XCircleIcon className="text-white" />
      </TouchableOpacity>
    </View>
  ),
  accent: ({ text1 }: BaseToastProps) => (
    <View
      style={{
        position: "relative",
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: COLOURS.accent,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}>
      <Typography weigth="bold" type="S" className="text-white">
        {text1}
      </Typography>
      <TouchableOpacity
        onPress={() => Toast.hide()}
        className="absolute right-4">
        <XCircleIcon className="text-white" />
      </TouchableOpacity>
    </View>
  ),
};

const AppToast = () => <Toast config={toastConfig} />;

export { AppToast };
