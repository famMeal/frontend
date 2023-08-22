import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import type { RootStackParamList } from "types/navigation.types";
import { CreateMealScreen } from "./CreateMealScreen";
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

  if (loading)
    return (
      <View className="flex-1 bg-accent items-center justify-center p-0">
        <Text className="text-white">Splash Screen</Text>
      </View>
    );

  return (
    <Navigator>
      <Screen
        options={{
          headerShown: false,
        }}
        name="Restaurant"
        component={RestaurantScreen}
        initialParams={{ restaurantID: data?.restaurant?.id }}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="CreateMeal"
        component={CreateMealScreen}
        initialParams={{ restaurantID: data?.restaurant?.id }}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="RestaurantOrders"
        component={RestaurantOrdersScreen}
        initialParams={{
          orders: data?.restaurant?.orders,
          restaurantID: data?.restaurant?.id,
        }}
      />
    </Navigator>
  );
};

export { RestaurantScreens };
