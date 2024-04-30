import type { RouteProp } from "@react-navigation/native";
import type { Dispatch, SetStateAction } from "react";
import { CartScreen } from "screens/ClientScreens/CartScreen";
import { MainScreen } from "screens/ClientScreens/MainScreen";
import { OrdersScreen } from "screens/ClientScreens/OrdersScreen";
import { ProfileScreen } from "screens/ClientScreens/ProfileScreen";
import type { RootStackParamList } from "types/navigation.types";

export interface ClientRouteProps<T extends keyof RootStackParamList> {
  route: RouteProp<RootStackParamList, T>;
  navigation: any;
}

type ClientRoutes = ClientRouteProps<"Main" | "Cart" | "Profile" | "Orders">;

const clientRoutes = (setActiveScreen: Dispatch<SetStateAction<string>>) =>
  [
    {
      name: "Main",
      iconName: "utensils",
      tabBarLabel: "Today's Batches",
      renderComponent: (props: ClientRoutes) => (
        <MainScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"Main">)}
        />
      ),
    },
    {
      name: "Cart",
      iconName: "shopping",
      tabBarLabel: "Cart",
      renderComponent: (props: ClientRoutes) => (
        <CartScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"Cart">)}
        />
      ),
    },
    {
      name: "Orders",
      iconName: "list",
      tabBarLabel: "Orders",
      renderComponent: (props: ClientRoutes) => (
        <OrdersScreen
          setActiveScreen={setActiveScreen}
          {...(props as ClientRouteProps<"Orders">)}
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
