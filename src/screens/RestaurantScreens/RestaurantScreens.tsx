import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Header } from "components";
import { COLOURS } from "constants/colours";
import { CookingPotIcon, Home, ListTodoIcon } from "lucide-react-native";
import type { FC } from "react";
import React, { useCallback, useState } from "react";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { RestaurantHomeScreens } from "./RestaurantHomeScreens";
import { RestaurantMealsScreens } from "./RestaurantMealsScreens";
import { RestaurantOrdersScreen } from "./RestaurantOrdersScreen";
import { SkeletonRestaurantScreens } from "./SkeletonRestaurantScreens";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Restaurants"
>;

interface Props extends RestaurantStackProps {}

const RestaurantScreens: FC<Props> = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState("RestaurantHomeScreens");
  const { data, loading } = useCurrentUserQuery();

  useFocusEffect(
    useCallback(() => {
      const { name } =
        navigation?.getState?.().routes[navigation?.getState?.().index];

      setActiveScreen(name);
    }, [navigation])
  );

  if (!data?.currentUser?.restaurant || loading) {
    return <SkeletonRestaurantScreens />;
  }

  return (
    <Navigator
      initialRouteName="RestaurantHomeScreens"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLOURS.light,
        },
      }}>
      <Screen
        options={{
          tabBarLabelStyle: {
            marginBottom: 5,
            fontFamily: "Khula-Bold",
            color:
              activeScreen === "RestaurantHomeScreens"
                ? COLOURS.primary
                : COLOURS.accent,
          },
          tabBarLabel: "Home",
          headerShown: false,
          headerTitleStyle: {
            color: COLOURS.white,
            fontFamily: "Khula-Bold",
            fontSize: 18,
          },
          tabBarIcon: () => (
            <Home
              size={18}
              color={
                activeScreen === "RestaurantHomeScreens"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="RestaurantHomeScreens"
        initialParams={{ restaurantID: data?.currentUser?.restaurant?.id }}>
        {props => (
          <RestaurantHomeScreens {...props} setActiveScreen={setActiveScreen} />
        )}
      </Screen>
      <Screen
        options={{
          tabBarLabelStyle: {
            marginBottom: 5,
            fontFamily: "Khula-Bold",
            color:
              activeScreen === "RestaurantMealsScreens"
                ? COLOURS.primary
                : COLOURS.accent,
          },
          tabBarLabel: "Meals",
          headerShown: false,
          headerTitleStyle: {
            color: COLOURS.white,
            fontFamily: "Khula-Bold",
            fontSize: 18,
          },
          tabBarIcon: () => (
            <CookingPotIcon
              size={18}
              color={
                activeScreen === "RestaurantMealsScreens"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="RestaurantMealsScreens"
        initialParams={{
          restaurantID: data?.currentUser?.restaurant?.id,
        }}>
        {props => (
          <RestaurantMealsScreens
            {...props}
            setActiveScreen={setActiveScreen}
          />
        )}
      </Screen>
      <Screen
        options={{
          tabBarLabelStyle: {
            marginBottom: 5,
            fontFamily: "Khula-Bold",
            color:
              activeScreen === "RestaurantOrdersScreen"
                ? COLOURS.primary
                : COLOURS.accent,
          },
          tabBarLabel: "Orders",
          headerShown: true,
          headerBackground: () => <Header title="Orders" />,
          headerTitleStyle: {
            display: "none",
          },
          tabBarIcon: () => (
            <ListTodoIcon
              size={18}
              color={
                activeScreen === "RestaurantOrdersScreen"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="RestaurantOrdersScreen"
        initialParams={{
          restaurantID: data?.currentUser?.restaurant?.id,
        }}>
        {props => (
          <RestaurantOrdersScreen
            {...props}
            setActiveScreen={setActiveScreen}
          />
        )}
      </Screen>
    </Navigator>
  );
};

export default RestaurantScreens;
