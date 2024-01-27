import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Logo from "assets/svgs/logo.svg";
import { Column, Columns, Container } from "components";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  BookOpenIcon,
  HomeIcon,
  PlayIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { CreateMealScreen } from "./CreateMealScreen";
import { RestaurantHomeScreens } from "./RestaurantHomeScreens";
import { RestaurantMealsScreens } from "./RestaurantMealsScreens";
import { RestaurantOrdersScreen } from "./RestaurantOrdersScreen";
import { useRestaurantOrdersQuery } from "./useRestaurantOrdersQuery";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const RestaurantScreens: FC = () => {
  const [activeScreen, setActiveScreen] = useState("RestaurantHomeScreens");
  const navigation = useNavigation();
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
        navigation.getState().routes[navigation.getState().index];

      setActiveScreen(name);
    }, [navigation]),
  );

  if (loading) {
    return (
      <Container>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Columns>
            <Column
              alignItems="center"
              columnWidth="fullWidth"
              justifyContent="center">
              <Logo />
            </Column>
          </Columns>
        </View>
      </Container>
    );
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
