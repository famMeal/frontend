import { COLOURS } from "constants/colours";
import { UtensilsIcon } from "lucide-react-native";
import type { FC, ReactNode } from "react";
import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  theme?: "accent" | "primary";
  icon?: ReactNode;
  onClick?: (id?: string) => void;
  id?: string;
}

const MapMarker: FC<Props> = memo(({ theme = "accent", icon, onClick, id }) => {
  return (
    <TouchableOpacity onPress={() => onClick?.(id)}>
      <View style={styles.container}>
        <View
          style={[
            styles.markerIconContainer,
            { backgroundColor: COLOURS[theme] },
          ]}>
          {icon ?? <UtensilsIcon size={17} color={COLOURS.white} />}
        </View>
        <View
          style={[styles.markerTriangle, { borderTopColor: COLOURS[theme] }]}
        />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerIconContainer: {
    padding: 9,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -9,
  },
});

export { MapMarker };
