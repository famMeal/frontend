import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { useCallback, useState } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { RestaurantScreen } from "./RestaurantScreen";
const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const RestaurantScreens: FC = () => {
  const [activeScreen, setActiveScreen] = useState("");
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const { name } =
        navigation.getState().routes[navigation.getState().index];

      setActiveScreen(name);
    }, [navigation]),
  );

  return (
    <Navigator>
      <Screen name="Restaurant" component={RestaurantScreen} />
    </Navigator>
  );
};

export { RestaurantScreens };
