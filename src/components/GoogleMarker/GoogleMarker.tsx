import { COLOURS } from "constants/colours";
import { UtensilsIcon } from "lucide-react-native";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { View } from "react-native";

interface Props {
  theme?: "accent" | "primary";
  icon?: ReactNode;
}

const GoogleMarker: FC<Props> = memo(({ theme = "accent", icon }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          marginBottom: 10,
          backgroundColor: COLOURS[theme],
          padding: 14,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}>
        {icon ?? <UtensilsIcon size={20} color={COLOURS.white} />}
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          backgroundColor: "transparent",
          borderStyle: "solid",
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 15,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: COLOURS[theme],
          marginTop: -12,
        }}
      />
    </View>
  );
});

export { GoogleMarker };
