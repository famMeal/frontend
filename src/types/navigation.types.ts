import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Meal, Restaurant, User } from "schema";
import type { AddToCartData } from "screens/ClientScreens/MealsScreen/MealScreen/useAddToCartMutation";
import type { RestaurantMealsQueryData } from "screens/RestaurantScreens/RestaurantMealsScreens/RestaurantMeals/useRestaurantMealsQuery";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  EmailSignUp: undefined;
  VerifyAccount: {
    email: User["email"];
  };
  TabNavigator: undefined;
  Restaurants: undefined;
  RestaurantOrdersScreen: {
    restaurantID: Restaurant["id"];
  };
  RestaurantDashboardScreen: {
    restaurantID: Restaurant["id"];
  };
  RestaurantSettingsScreen: {
    restaurantID: Restaurant["id"];
  };
  RestaurantHomeScreens: {
    restaurantID: Restaurant["id"];
  };
  RestaurantMeals: {
    restaurantID: Restaurant["id"];
  };
  ActivateRestaurantMeal: {
    meal: RestaurantMealsQueryData["restaurant"]["meals"][number];
    restaurantID: Restaurant["id"];
  };
  RestaurantMealsScreens: {
    restaurantID: Restaurant["id"];
  };
  Splash: undefined;
  Clients: undefined;
  Meals: {
    userID: User["id"];
  };
  Main: {
    userID: User["id"];
  };
  Meal: {
    restaurantID: Restaurant["id"];
    restaurantName: Restaurant["name"];
    mealID: Meal["id"];
    userID: User["id"];
  };
  Confirmation: {
    userID: User["id"];
    cart: AddToCartData;
  };
  Profile: {
    userID: User["id"];
  };
  Orders: {
    userID: User["id"];
  };
  PreviousOrders: undefined;
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

export type SignUpNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

export type EmailSignUpNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

export type VerifyAccountNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "VerifyAccount"
>;
