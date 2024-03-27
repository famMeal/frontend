import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Header } from "components";
import { type FC } from "react";
import { Alert } from "react-native";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/solid";
import type { Restaurant } from "schema";
import type { RootStackParamList } from "types/navigation.types";
import { useLogoutMutation } from "./useLogoutMutation";

interface Props {
  restaurantID: Restaurant["id"];
}

export type MainNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantDashboardScreen"
>;

const RestaurantSettingsHeader: FC<Props> = ({ restaurantID }) => {
  const navigation = useNavigation<MainNavigationProps>();
  const { navigate } = navigation;

  const [logout] = useLogoutMutation();

  const onPress = () => {
    logout({
      onCompleted: async () => {
        try {
          await AsyncStorage.removeItem("credentials");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      onError: error => {
        console.error("Logout error:", error);
      },
    });
  };

  const showAlert = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Logout", onPress },
    ]);
  };

  const onBackButtonPress = () =>
    navigate("RestaurantDashboardScreen", { restaurantID });

  return (
    <Header title="Settings" onBackButtonPress={onBackButtonPress}>
      <Button theme="accent" isClean onPress={showAlert} isFullyRounded>
        <ArrowLeftOnRectangleIcon color="white" size={30} />
      </Button>
    </Header>
  );
};

export { RestaurantSettingsHeader };
