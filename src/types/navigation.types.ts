import type { Restaurant, Meal } from 'schema';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  TabNavigator: undefined;
  Home: undefined;
  Splash: undefined;
  Meals: undefined;
  Main: undefined;
  Meal: {
    restaurantID: Restaurant['id'];
    restaurantName: Restaurant['name'];
    mealID: Meal['id'];
  };
  Confirmation: undefined;
  Profile: undefined;
  Orders: undefined;
  Login: undefined;
};

export type MainNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

export type ConfirmationNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export type ProfileNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type OrdersNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Orders'
>;

export type LoginNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type SplashNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;
