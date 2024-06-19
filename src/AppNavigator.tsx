import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header, Loader } from "components";
import { COLOURS } from "constants/colours";
import React, { Suspense, lazy } from "react";
import { LoginScreen, SplashScreen } from "screens";
import type { RootStackParamList } from "types/navigation.types";
import { useAuthContext } from "./context";

const ClientScreens = lazy(() => import("screens/ClientScreens"));
const RestaurantScreens = lazy(() => import("screens/RestaurantScreens"));
const SignUpScreen = lazy(() => import("screens/SignupScreen"));
const VerifyAccountScreen = lazy(() => import("screens/VerifyAccountScreen"));

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const AppNavigator = () => {
  const context = useAuthContext();
  const { isLoggedIn } = context ?? {};

  if (isLoggedIn === null) {
    return <Loader />;
  }

  return (
    <Navigator initialRouteName={isLoggedIn ? "Splash" : "Login"}>
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
  );
};

export { AppNavigator };
