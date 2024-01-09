import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import {
  BookOpenIcon,
  HomeIcon,
  PlayIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import type { RootStackParamList } from "types/navigation.types";
import { CreateMealScreen } from "./CreateMealScreen";
import { RestaurantMealsScreens } from "./RestaurantMealsScreens";
import { RestaurantOrdersScreen } from "./RestaurantOrdersScreen";
import { RestaurantScreen } from "./RestaurantScreen";
import { useRestaurantOrdersQuery } from "./useRestaurantOrdersQuery";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const RestaurantScreens: FC = () => {
  const [activeScreen, setActiveScreen] = useState("");
  const navigation = useNavigation();

  const { data, loading } = useRestaurantOrdersQuery({
    variables: {
      id: "6",
    },
  });

  useFocusEffect(
    useCallback(() => {
      const { name } =
        navigation.getState().routes[navigation.getState().index];

      setActiveScreen(name);
    }, [navigation]),
  );

  if (loading) {
    return (
      <View className="flex-1 bg-accent items-center justify-center p-0">
        <Text className="text-white">Splash Screen</Text>
      </View>
    );
  }

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLOURS.light,
        },
      }}>
      <Screen
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          headerTitleStyle: {
            color: COLOURS.white,
            fontFamily: "Khula-Bold",
            fontSize: 18,
          },
          tabBarIcon: () => (
            <HomeIcon
              size={18}
              color={
                activeScreen === "Restaurant" ? COLOURS.primary : COLOURS.accent
              }
            />
          ),
        }}
        name="Restaurant"
        initialParams={{ restaurantID: data?.restaurant?.id }}>
        {props => (
          <RestaurantScreen {...props} setActiveScreen={setActiveScreen} />
        )}
      </Screen>
      <Screen
        options={{
          tabBarLabel: "Meals",
          headerShown: false,
          headerTitleStyle: {
            color: COLOURS.white,
            fontFamily: "Khula-Bold",
            fontSize: 18,
          },
          tabBarIcon: () => (
            <BookOpenIcon
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
          restaurantID: data?.restaurant?.id,
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
          tabBarLabel: "Create",
          headerShown: false,
          headerTitleStyle: {
            color: COLOURS.white,
            fontFamily: "Khula-Bold",
            fontSize: 18,
          },
          tabBarIcon: () => (
            <PlusCircleIcon
              size={18}
              color={
                activeScreen === "CreateMeal" ? COLOURS.primary : COLOURS.accent
              }
            />
          ),
        }}
        name="CreateMeal"
        initialParams={{ restaurantID: data?.restaurant?.id }}>
        {props => (
          <CreateMealScreen {...props} setActiveScreen={setActiveScreen} />
        )}
      </Screen>
      <Screen
        options={{
          tabBarLabel: "Active Orders",
          headerShown: false,
          headerTitleStyle: {
            color: COLOURS.white,
            fontFamily: "Khula-Bold",
            fontSize: 18,
          },
          tabBarIcon: () => (
            <PlayIcon
              size={18}
              color={
                activeScreen === "ActiveOrders"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="ActiveOrders"
        initialParams={{
          restaurantID: data?.restaurant?.id,
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

export { RestaurantScreens };
