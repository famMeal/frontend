import { ApolloProvider } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import {
  ClientScreens,
  LoginScreen,
  RestaurantScreens,
  SplashScreen,
} from "screens";
import type { RootStackParamList } from "types/navigation.types";
import { client } from "./client";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Splash"
            component={SplashScreen}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
          <Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerBackground: () => null,
              tabBarStyle: {
                display: "none",
              },
              headerTitleStyle: {
                color: COLOURS.white,
                fontFamily: "Khula-Bold",
                fontSize: 18,
              },
            }}
          />
          <Screen
            name="Clients"
            component={ClientScreens}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
          <Screen
            name="Restaurants"
            component={RestaurantScreens}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
        </Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export { App };
