import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { ClientSignUpTab } from "./ClientSignUpTab";
import { RestaurantSignUpTab } from "./RestaurantSignUpTab";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const SignUpScreen: FC = () => {
  return (
    <Navigator>
      <Screen
        component={ClientSignUpTab}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: COLOURS.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Khula-Bold",
            fontSize: 14,
          },
        }}
        name="Clients"
      />

      <Screen
        component={RestaurantSignUpTab}
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: COLOURS.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Khula-Bold",
            fontSize: 14,
          },
        }}
        name="Restaurants"
      />
    </Navigator>
  );
};

export default SignUpScreen;
