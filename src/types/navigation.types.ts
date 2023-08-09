import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Meal, Restaurant } from "schema";

export type RootStackParamList = {
  TabNavigator: undefined;
  Clients: undefined;
  Restaurants: undefined;
  Restaurant: undefined;
  Splash: undefined;
  Meals: undefined;
  Main: undefined;
  Meal: {
    restaurantID: Restaurant["id"];
    restaurantName: Restaurant["name"];
    mealID: Meal["id"];
  };
  Confirmation: undefined;
  Profile: undefined;
  Orders: undefined;
  Login: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Main"
>;

export type ConfirmationNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Confirmation"
>;

export type ProfileNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export type OrdersNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Orders"
>;

export type LoginNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type SplashNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;
