import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Header } from "components/Header";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";

import { RestaurantDashboardScreen } from "./RestaurantDashboardScreen";
import { RestaurantSettingsHeader } from "./RestaurantSettingsHeader";
import { RestaurantSettingsScreen } from "./RestaurantSettingsScreen";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantHomeScreens"
>;

interface Props extends RestaurantStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantHomeScreens: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Navigator>
      <Screen
        name="RestaurantDashboardScreen"
        component={RestaurantDashboardScreen}
        initialParams={{ restaurantID }}
        options={{
          headerShown: false,
          headerBackground: () => <Header title="Dashboard" />,
        }}
      />
      <Screen
        name="RestaurantSettingsScreen"
        component={RestaurantSettingsScreen}
        initialParams={{ restaurantID }}
        options={{
          headerShown: false,
          headerBackground: () => (
            <RestaurantSettingsHeader
              restaurantID={route?.params?.restaurantID}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export { RestaurantHomeScreens };
