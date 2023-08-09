import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { Platform, View } from "react-native";
import {
  DEVELOPMENT_URI_ANDROID_BACKEND,
  DEVELOPMENT_URI_IOS_BACKEND,
  PRODUCTION_URI_BACKEND,
} from "react-native-dotenv";
import {
  ClientScreens,
  LoginScreen,
  RestaurantScreens,
  SplashScreen,
} from "screens";
import type { RootStackParamList } from "types/navigation.types";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const client = new ApolloClient({
  uri: __DEV__
    ? Platform.OS === "ios"
      ? DEVELOPMENT_URI_IOS_BACKEND
      : DEVELOPMENT_URI_ANDROID_BACKEND
    : PRODUCTION_URI_BACKEND,
  cache: new InMemoryCache(),
});

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
              headerBackground: () => (
                <View className="bg-accent w-full h-full relative flex justify-end items-center" />
              ),
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
