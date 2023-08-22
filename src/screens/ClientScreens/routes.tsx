import type { RouteProp } from "@react-navigation/native";
import type { Dispatch, SetStateAction } from "react";
import { ConfirmationScreen } from "screens/ClientScreens/ConfirmationScreen";
import { MainScreen } from "screens/ClientScreens/MainScreen";
import { OrdersScreen } from "screens/ClientScreens/OrdersScreen";
import { ProfileScreen } from "screens/ClientScreens/ProfileScreen";
import type { RootStackParamList } from "types/navigation.types";

export interface ClientRouteProps<T extends keyof RootStackParamList> {
  route: RouteProp<RootStackParamList, T>;
  navigation: any;
}

type ClientRoutes = ClientRouteProps<
  "Main" | "Confirmation" | "Profile" | "ClientOrders"
>;

const clientRoutes = (setActiveScreen: Dispatch<SetStateAction<string>>) =>
  [
    {
      name: "Main",
      iconName: "archive",
      tabBarLabel: "Meals",
      renderComponent: (props: ClientRoutes) => (
        <MainScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"Main">)}
        />
      ),
    },
    {
      name: "Confirmation",
      iconName: "badge",
      tabBarLabel: "Confirmation",
      renderComponent: (props: ClientRoutes) => (
        <ConfirmationScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"Confirmation">)}
        />
      ),
    },
    {
      name: "ClientOrders",
      iconName: "shopping",
      tabBarLabel: "Orders",
      renderComponent: (props: ClientRoutes) => (
        <OrdersScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"ClientOrders">)}
        />
      ),
    },
    {
      name: "Profile",
      iconName: "user",
      tabBarLabel: "Profile",
      renderComponent: (props: ClientRoutes) => (
        <ProfileScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"Profile">)}
        />
      ),
    },
  ] as const;

export { clientRoutes };
