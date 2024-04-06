import { ApolloProvider } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { AppToast } from "components";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  AppSplashScreen,
  ClientScreens,
  EmailSignUpScreen,
  LoginScreen,
  RestaurantScreens,
  SignUpScreen,
  VerifyAccountScreen,
} from "screens";
import type { RootStackParamList } from "types/navigation.types";
import { client } from "./client";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const App: FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Navigator initialRouteName="Login">
            <Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
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
              name="Splash"
              component={AppSplashScreen}
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}
            />
            <Screen
              name="SignUp"
              component={SignUpScreen}
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
              name="EmailSignUp"
              component={EmailSignUpScreen}
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
              name="VerifyAccount"
              component={VerifyAccountScreen}
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
          <AppToast />
        </NavigationContainer>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
};

export { App };
