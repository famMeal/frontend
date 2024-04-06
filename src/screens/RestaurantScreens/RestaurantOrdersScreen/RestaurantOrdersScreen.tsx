import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOURS } from "constants/colours";
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, type FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { RestaurantActiveOrdersTab } from "./RestaurantActiveOrdersTab";
import { RestaurantPreviousOrdersTab } from "./RestaurantPreviousOrdersTab";

type ActiveOrdersStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantOrdersScreen"
>;

interface Props extends ActiveOrdersStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const { Navigator, Screen } = createMaterialTopTabNavigator();

const RestaurantOrdersScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name)
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Navigator>
      <Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: COLOURS.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Khula-Bold",
            fontSize: 14,
          },
        }}
        name="Active">
        {props => (
          <RestaurantActiveOrdersTab {...props} restaurantID={restaurantID} />
        )}
      </Screen>
      <Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: COLOURS.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Khula-Bold",
            fontSize: 14,
          },
        }}
        name="Completed">
        {props => (
          <RestaurantPreviousOrdersTab {...props} restaurantID={restaurantID} />
        )}
      </Screen>
    </Navigator>
  );
};

export { RestaurantOrdersScreen };
