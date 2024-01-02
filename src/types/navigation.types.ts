import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { Meal, Restaurant } from "schema";
import type { AddToCartData } from "screens/ClientScreens/MealsScreen/MealScreen/useAddToCartMutation";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  EmailSignUp: undefined;
  TabNavigator: undefined;
  Restaurants: undefined;
  ActiveOrders: {
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
  Confirmation: {
    cart: AddToCartData;
  };
  Profile: undefined;
  Orders: undefined;
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
