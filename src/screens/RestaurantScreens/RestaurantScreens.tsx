import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOURS } from "constants/colours";
import type { Dispatch, FC, SetStateAction } from "react";
import { useCallback, useState } from "react";
import {
  BookOpenIcon,
  HomeIcon,
  PlayIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { RestaurantCreateMealScreen } from "./RestaurantCreateMealScreen";
import { RestaurantHomeScreens } from "./RestaurantHomeScreens";
import { RestaurantMealsScreens } from "./RestaurantMealsScreens";
import { RestaurantOrdersScreen } from "./RestaurantOrdersScreen";
import { SkeletonRestaurantScreens } from "./SkeletonRestaurantScreens";
import { useRestaurantOrdersQuery } from "./useRestaurantOrdersQuery";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantHomeScreens"
>;

interface Props extends RestaurantStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantScreens: FC<Props> = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState("RestaurantHomeScreens");
  const { data: currentUserData } = useCurrentUserQuery();
  const { id } = currentUserData?.currentUser?.restaurant ?? {};

  const { data, loading } = useRestaurantOrdersQuery({
    skip: !id,
    variables: {
      id: id!,
    },
  });

  useFocusEffect(
    useCallback(() => {
      const { name } =
        navigation?.getState?.().routes[navigation?.getState?.().index];

      setActiveScreen(name);
    }, [navigation]),
  );

  if (loading) {
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
                activeScreen === "Restaurants"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="RestaurantHomeScreens"
        initialParams={{ restaurantID: data?.restaurant?.id }}>
        {props => (
          <RestaurantHomeScreens {...props} setActiveScreen={setActiveScreen} />
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
                activeScreen === "RestaurantCreateMealScreen"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="RestaurantCreateMealScreen"
        initialParams={{ restaurantID: data?.restaurant?.id }}>
        {props => (
          <RestaurantCreateMealScreen
            {...props}
            setActiveScreen={setActiveScreen}
          />
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
                activeScreen === "RestaurantOrdersScreen"
                  ? COLOURS.primary
                  : COLOURS.accent
              }
            />
          ),
        }}
        name="RestaurantOrdersScreen"
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
