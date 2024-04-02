import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLOURS } from "constants/colours";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { ActiveOrderTab } from "./ActiveOrderTab";
import { PreviousOrdersTab } from "./PreviousOrdersTab";

type OrderStackProps = NativeStackScreenProps<RootStackParamList, "Orders">;

interface Props extends OrderStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const { Navigator, Screen } = createMaterialTopTabNavigator();

const OrdersScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const { userID } = route?.params ?? {};

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name)
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Navigator>
      <Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: COLOURS.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Khula-Bold",
            fontSize: 14,
          },
        }}
        name="Active">
        {props => <ActiveOrderTab {...props} userID={userID} />}
      </Screen>
      <Screen
        options={{
          tabBarIndicatorStyle: {
            backgroundColor: COLOURS.primary,
          },
          tabBarLabelStyle: {
            fontFamily: "Khula-Bold",
            fontSize: 14,
          },
        }}
        name="Previous">
        {props => <PreviousOrdersTab {...props} userID={userID} />}
      </Screen>
    </Navigator>
  );
};

export { OrdersScreen };
