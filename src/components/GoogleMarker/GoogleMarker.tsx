import { COLOURS } from "constants/colours";
import { UtensilsIcon } from "lucide-react-native";
import { View } from "react-native";

const GoogleMarker = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: COLOURS.accent,
          padding: 14,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <UtensilsIcon size={20} color={COLOURS.white} />
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
          borderTopColor: COLOURS.accent,
          marginTop: -6,
        }}
      />
    </View>
  );
};

export { GoogleMarker };
