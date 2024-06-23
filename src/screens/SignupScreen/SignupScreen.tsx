import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { ClientSignUpTab } from "./ClientSignUpTab";
import { RestaurantSignUpTab } from "./RestaurantSignUpTab";

const { Navigator, Screen } = createMaterialTopTabNavigator();

type VerifyAccountStackProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUp"
>;

interface Props extends VerifyAccountStackProps {}

const SignUpScreen: FC<Props> = () => {
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
export type { Props as SignUpScreenProps };
