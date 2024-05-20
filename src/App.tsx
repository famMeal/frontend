import { ApolloProvider } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  type LinkingOptions,
} from "@react-navigation/native";
import Logo from "assets/svgs/logo.svg";
import { client } from "client";
import { AppToast, Column, Columns, Header } from "components";
import { COLOURS } from "constants/colours";
import React, { Suspense, useEffect, type FC } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppSplashScreen from "screens/AppSplashScreen/AppSplashScreen";
import LoginScreen from "screens/LoginScreen/LoginScreen";
import type { RootStackParamList } from "types/navigation.types";

const ClientScreens = React.lazy(
  () => import("screens/ClientScreens/ClientScreens")
);
const RestaurantScreens = React.lazy(
  () => import("screens/RestaurantScreens/RestaurantScreens")
);
const SignUpScreen = React.lazy(
  () => import("screens/SignupScreen/SignupScreen")
);
const VerifyAccountScreen = React.lazy(
  () => import("screens/VerifyAccountScreen/VerifyAccountScreen")
);

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["batch://"],
  config: {
    screens: {
      Login: "login",
      Splash: "splash",
      SignUp: "signup",
      EmailSignUp: "emailsignup",
      VerifyAccount: "verifyaccount",
      Clients: "clients",
      Restaurants: "restaurants",
    },
  },
};

const Loader = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Columns>
      <Column
        alignItems="flex-end"
        columnWidth="twoThird"
        justifyContent="center">
        <Logo />
      </Column>
      <Column columnWidth="oneThird">
        <ActivityIndicator size="large" color={COLOURS.accent} />
      </Column>
    </Columns>
  </View>
);

const App: FC = () => {
  useEffect(() => {
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log(`App opened with URL: ${initialUrl}`);
      }
    };

    handleInitialURL();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <NavigationContainer linking={linking}>
          <Navigator initialRouteName="Login">
            <Screen
              component={LoginScreen}
              name="Login"
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
              component={AppSplashScreen}
              name="Splash"
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}
            />
            <Screen
              name="SignUp"
              options={{
                headerBackground: () => <Header title="Sign Up" />,
                tabBarStyle: {
                  display: "none",
                },
                headerTitleStyle: {
                  display: "none",
                  color: COLOURS.white,
                  fontFamily: "Khula-Bold",
                  fontSize: 18,
                },
              }}>
              {() => (
                <Suspense fallback={<Loader />}>
                  <SignUpScreen />
                </Suspense>
              )}
            </Screen>
            <Screen
              name="VerifyAccount"
              options={{
                headerBackground: () => <Header title="Verify Email" />,
                tabBarStyle: {
                  display: "none",
                },
                headerTitleStyle: {
                  display: "none",
                  color: COLOURS.white,
                  fontFamily: "Khula-Bold",
                  fontSize: 18,
                },
              }}>
              {props => (
                <Suspense fallback={<Loader />}>
                  <VerifyAccountScreen {...props} />
                </Suspense>
              )}
            </Screen>
            <Screen
              name="Clients"
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}>
              {props => (
                <Suspense fallback={<Loader />}>
                  <ClientScreens {...props} />
                </Suspense>
              )}
            </Screen>
            <Screen
              name="Restaurants"
              options={{
                headerShown: false,
                tabBarStyle: {
                  display: "none",
                },
              }}>
              {props => (
                <Suspense fallback={<Loader />}>
                  <RestaurantScreens {...props} />
                </Suspense>
              )}
            </Screen>
          </Navigator>
          <AppToast />
        </NavigationContainer>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
};

export { App };
