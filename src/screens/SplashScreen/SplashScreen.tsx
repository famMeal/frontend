import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreenRN from "react-native-splash-screen";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const Screens = {
  Restaurants: "Restaurants",
  Clients: "Clients",
} as const;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { data, loading } = useCurrentUserQuery();
  const { id } = data?.currentUser?.restaurant ?? {};

  useEffect(() => {
    if (!loading) {
      SplashScreenRN.hide();
      if (id) {
        navigation.navigate(Screens.Clients);
      } else {
        navigation.navigate(Screens.Clients);
      }
    }
  }, [loading, id, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return null;
};

export { SplashScreen };
