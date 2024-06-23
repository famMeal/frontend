import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Header, Loader } from "components";
import { COLOURS } from "constants/colours";
import type { FC, LazyExoticComponent } from "react";
import React, { Suspense, lazy } from "react";
import { LoginScreen, SplashScreen } from "screens";
import type { ClientScreenProps } from "screens/ClientScreens";
import type { RestaurantScreenProps } from "screens/RestaurantScreens";
import type { SignUpScreenProps } from "screens/SignupScreen";
import type { VerifyAccountScreenProps } from "screens/VerifyAccountScreen";
import type { RootStackParamList } from "types/navigation.types";
import { useAuthContext } from "./context";

const ClientScreens: LazyExoticComponent<FC<ClientScreenProps>> = lazy(
  () => import("screens/ClientScreens")
);
const RestaurantScreens: LazyExoticComponent<FC<RestaurantScreenProps>> = lazy(
  () => import("screens/RestaurantScreens")
);
const SignUpScreen: LazyExoticComponent<FC<SignUpScreenProps>> = lazy(
  () => import("screens/SignupScreen")
);
const VerifyAccountScreen: LazyExoticComponent<FC<VerifyAccountScreenProps>> =
  lazy(() => import("screens/VerifyAccountScreen"));

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
};

const headerStyles = {
  color: COLOURS.white,
  fontFamily: "Khula-Bold",
  fontSize: 18,
};

type ScreenProps = {
  Clients: ClientScreenProps;
  Restaurants: RestaurantScreenProps;
  SignUp: SignUpScreenProps;
  VerifyAccount: VerifyAccountScreenProps;
};

type LazyProps<Name extends keyof ScreenProps> = ScreenProps[Name];

const lazyScreen = <Name extends keyof ScreenProps>(
  Component: LazyExoticComponent<FC<LazyProps<Name>>>,
  name: Name,
  title: string
) => (
  <Screen
    name={name}
    options={{
      headerBackground: () => <Header title={title} />,
      ...screenOptions,
      tabBarStyle: {
        display: "none",
      },
    }}>
    {props => (
      <Suspense fallback={<Loader />}>
        <Component {...(props as any)} />
      </Suspense>
    )}
  </Screen>
);

const AppNavigator = () => {
  const { isLoggedIn } = useAuthContext() ?? {};

  if (isLoggedIn === null) {
    return <Loader />;
  }

  return (
    <Navigator initialRouteName={isLoggedIn ? "Splash" : "Login"}>
      <Screen
        component={LoginScreen}
        name="Login"
        options={{
          ...screenOptions,
          ...headerStyles,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Screen
        component={SplashScreen}
        name="Splash"
        options={{
          ...screenOptions,
          ...headerStyles,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      {lazyScreen(SignUpScreen, "SignUp", "Sign Up")}
      {lazyScreen(VerifyAccountScreen, "VerifyAccount", "Verify Email")}
      {lazyScreen(ClientScreens, "Clients", "Clients")}
      {lazyScreen(RestaurantScreens, "Restaurants", "Restaurants")}
    </Navigator>
  );
};

export { AppNavigator };
