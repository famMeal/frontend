import { ApolloProvider } from "@apollo/client";
import {
  NavigationContainer,
  type LinkingOptions,
} from "@react-navigation/native";
import { client } from "client";
import { AppToast } from "components";
import React, { type FC } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import type { RootStackParamList } from "types/navigation.types";
import { AppNavigator } from "./AppNavigator";
import { AuthProvider } from "./context";

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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <AuthProvider>
          <NavigationContainer linking={linking}>
            <AppNavigator />
            <AppToast />
          </NavigationContainer>
        </AuthProvider>
      </ApolloProvider>
    </GestureHandlerRootView>
  );
};

export { App };
