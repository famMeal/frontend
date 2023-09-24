import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Meal, Restaurant } from "schema";

export type RootStackParamList = {
  Login: undefined;
  TabNavigator: undefined;
  Restaurants: undefined;
  RestaurantOrders: {
    restaurantID: Restaurant["id"];
  };
  CreateMeal: {
    restaurantID: Restaurant["id"];
  };
  Restaurant: {
    restaurantID: Restaurant["id"];
  };
  RestaurantMeals: {
    restaurantID: Restaurant["id"];
  };
  Splash: undefined;
  Clients: undefined;
  Meals: undefined;
  Main: undefined;
  Meal: {
    restaurantID: Restaurant["id"];
    restaurantName: Restaurant["name"];
    mealID: Meal["id"];
  };
  Confirmation: undefined;
  Profile: undefined;
  ClientOrders: undefined;
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
  "ClientOrders"
>;

export type LoginNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type SplashNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Splash"
>;
