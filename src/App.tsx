import { ApolloProvider } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  type LinkingOptions,
} from "@react-navigation/native";
import { client } from "client";
import { AppToast, Header, Loader } from "components";
import { COLOURS } from "constants/colours";
import React, { Suspense, lazy, useEffect, type FC } from "react";
import { Linking } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LoginScreen, SplashScreen } from "screens";
import type { RootStackParamList } from "types/navigation.types";

const ClientScreens = lazy(() => import("screens/ClientScreens"));
const RestaurantScreens = lazy(() => import("screens/RestaurantScreens"));
const SignUpScreen = lazy(() => import("screens/SignupScreen"));
const VerifyAccountScreen = lazy(() => import("screens/VerifyAccountScreen"));

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

const App: FC = () => {
  useEffect(() => {
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl) {
        console.log(`App opened with URL: ${initialUrl}`);
      }
    };

    const onURLChange = ({ url }: { url: string }) => {
      console.log("URL Changed:", url);
    };

    const unsubscribe = Linking.addEventListener("url", onURLChange);

    handleInitialURL();

    return () => {
      unsubscribe.remove();
    };
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
              component={SplashScreen}
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
