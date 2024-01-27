import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Typography } from "components";
import { memo, type FC } from "react";
import { Alert, View } from "react-native";
import {
  ArrowLeftCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "react-native-heroicons/solid";
import type { Restaurant } from "schema";
import type { RootStackParamList } from "types/navigation.types";
import { getCSS } from "./RestaurantSettingsHeader.styles";
import { useLogoutMutation } from "./useLogoutMutation";

interface Props {
  restaurantID: Restaurant["id"];
}

export type MainNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantDashboardScreen"
>;

const RestaurantSettingsHeader: FC<Props> = memo(({ restaurantID }) => {
  const { container, wrapper, logoutWrapper } = getCSS();
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

  return (
    <View className={container}>
      <View className={wrapper}>
        <Button
          onPress={() =>
            navigate("RestaurantDashboardScreen", { restaurantID })
          }
          theme="accent"
          isFullyRounded>
          <ArrowLeftCircleIcon color="white" size={30} />
        </Button>
      </View>
      <View className={logoutWrapper}>
        <Button onPress={showAlert} theme="accent" isFullyRounded>
          <ArrowLeftOnRectangleIcon color="white" size={30} />
        </Button>
      </View>
      <Typography type="H3" weigth="bold" className="text-white">
        Settings
      </Typography>
    </View>
  );
});
export { RestaurantSettingsHeader };
