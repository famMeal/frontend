import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Container } from "components/Container";
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
import { SvgXml } from "react-native-svg";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { CreateMealScreen } from "./CreateMealScreen";
import { RestaurantMealsScreens } from "./RestaurantMealsScreens";
import { RestaurantOrdersScreen } from "./RestaurantOrdersScreen";
import { RestaurantScreen } from "./RestaurantScreen";
import { useRestaurantOrdersQuery } from "./useRestaurantOrdersQuery";
const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

const svgString = `
<svg width="172" height="37.5" viewBox="0 0 431 94" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.8177 17.0156C40.6771 17.0156 34.3906 21.0833 29.9531 28.6615V0H0V92.4583H29.9531V82.1042C34.3906 89.6823 40.6771 93.9375 48.8177 93.9375C68.9688 93.9375 80.4375 79.8854 80.4375 55.474C80.4375 30.8802 68.9688 17.0156 48.8177 17.0156ZM40.125 69.7135C33.651 69.7135 29.9531 64.5365 29.9531 55.474C29.9531 46.2292 33.651 41.0521 40.125 41.0521C46.9688 41.0521 50.849 46.2292 50.849 55.474C50.849 64.5365 46.9688 69.7135 40.125 69.7135Z" fill="#CA752B"/>
<path d="M169.579 18.4948H139.438V28.6615C135.183 21.0833 128.714 17.0156 120.579 17.0156C100.423 17.0156 89.1414 30.8802 89.1414 55.474C89.1414 79.8854 100.423 93.9375 120.579 93.9375C128.714 93.9375 135.183 89.6823 139.438 82.1042V92.4583H169.579V18.4948ZM129.266 69.7135C122.428 69.7135 118.73 64.5365 118.73 55.474C118.73 46.2292 122.428 41.0521 129.266 41.0521C135.928 41.0521 139.438 46.2292 139.438 55.474C139.438 64.5365 135.928 69.7135 129.266 69.7135Z" fill="#1E463F"/>
<path d="M252.424 70.2709C251.496 85.2449 238.366 93.9376 215.991 93.9376C193.986 93.9376 181.601 82.474 181.601 61.948V2.77612H211.554V23.8542H226.72V46.047H211.554V56.4011C211.554 64.9063 215.252 69.7136 221.538 69.7136C226.72 69.7136 229.861 66.5678 230.231 61.2084L252.424 70.2709Z" fill="#1E463F"/>
<path d="M339.517 64.9063C336.371 83.3958 322.132 93.9375 299.757 93.9375C274.053 93.9375 259.632 79.8854 259.632 55.474C259.632 30.8802 274.053 17.0156 299.757 17.0156C322.319 17.0156 336.559 27.3698 339.517 45.8594L311.038 50.6667C309.746 44.5677 305.861 41.0521 299.757 41.0521C293.1 41.0521 289.22 46.2292 289.22 55.474C289.22 64.5365 293.1 69.7135 299.757 69.7135C305.861 69.7135 309.746 66.1979 311.038 60.099L339.517 64.9063Z" fill="#1E463F"/>
<path d="M401.46 17.0156C391.658 17.1979 384.262 21.6354 379.825 30.1406V0H349.872V92.4583H379.825V55.8438C381.674 46.9688 385.559 41.9792 390.736 41.9792C396.841 41.9792 400.169 48.8177 400.169 61.0208V92.4583H430.309V50.4844C430.309 29.2188 419.955 17.0156 401.46 17.0156Z" fill="#1E463F"/>
</svg>
`;

const RestaurantScreens: FC = () => {
  const [activeScreen, setActiveScreen] = useState("");
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
              <SvgXml
                xml={svgString}
                style={{ padding: 40, justifyContent: "center" }}
              />
            </Column>
          </Columns>
        </View>
      </Container>
    );
  }

  return (
    <Navigator
      initialRouteName="Restaurant"
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
