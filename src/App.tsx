import { ApolloProvider } from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  type LinkingOptions,
} from "@react-navigation/native";
import { useState, useEffect, type FC, useRef } from "react";
import {
  ClientScreens,
  LoginScreen,
  RestaurantScreens,
  SignUpScreen,
  SplashScreen,
  EmailSignUpScreen,
  ConfirmEmailScreen,
  ConfirmationEmailSentScreen,
} from "screens";
import { Linking } from "react-native"; // Import Linking from react-native

import type { RootStackParamList } from "types/navigation.types";
import { client } from "./client";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const linkingOptions: LinkingOptions<RootStackParamList> = {
  prefixes: ["batchapp://"], // Add your app's custom scheme here
  config: {
    screens: {
      ConfirmEmail: "confirm_email/:token",
      SignUp: "signup",
    },
  },
};

const App: FC = () => {
  const handleDeepLink = (foo: any) => {
    console.log(foo);
    // const route = url.replace(/.*?:\/\//g, "");
    // const routeName = route.split("/")[0];
    // console.log({ route, routeName, url });
  };

  const subscription = Linking.addEventListener("url", handleDeepLink);
  useEffect(() => {
    const initialUrl = Linking.getInitialURL();
    initialUrl.then(url => {
      console.log("bla");
      console.log({ url });
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      subscription.remove();
    };
  }, [Linking.getInitialURL()]);

  return (
    <ApolloProvider client={client}>
      <NavigationContainer linking={linkingOptions}>
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
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
          <Screen
            name="EmailSignUp"
            component={EmailSignUpScreen}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
          <Screen
            name="ConfirmationEmailSent"
            component={ConfirmationEmailSentScreen}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
          <Screen
            name="ConfirmEmail"
            component={ConfirmEmailScreen}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: "none",
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
