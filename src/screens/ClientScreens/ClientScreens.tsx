import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Header } from "components";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { createScreenOptions } from "utilities";
import type { iconMap } from "utilities/createScreenOptions";
import { clientRoutes } from "./routes";

const { Navigator, Screen } = createBottomTabNavigator<RootStackParamList>();

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Clients"
>;

interface Props extends RestaurantStackProps {}

const ClientScreens: FC<Props> = ({ navigation }) => {
  const [activeScreen, setActiveScreen] = useState("");

  const clientScreens = useMemo(() => clientRoutes(setActiveScreen), []);
  const { data } = useCurrentUserQuery();
  const { id } = data?.currentUser ?? {};

  useFocusEffect(
    useCallback(() => {
      const { name } =
        navigation.getState().routes[navigation.getState().index];

      setActiveScreen(name);
    }, [navigation]),
  );

  const getOptions = (tabBarLabel: string, name: string, iconName: string) =>
    createScreenOptions({
      tabBarLabelStyle: {
        marginBottom: 5,
        fontFamily: "Khula-Bold",
        color: activeScreen === name ? COLOURS.primary : COLOURS.accent,
      },
      headerShown: true,
      headerTitleStyle: {
        display: "none",
      },
      headerBackground: () => <Header title={tabBarLabel} />,
      isScreenActive: activeScreen === name,
      iconName: iconName as keyof typeof iconMap,
    });

  const renderScreen = ({
    name,
    tabBarLabel,
    iconName,
    renderComponent,
    ...rest
  }: (typeof clientScreens)[number]) => (
    <Screen
      key={name}
      name={name}
      initialParams={{
        userID: id,
      }}
      options={getOptions(tabBarLabel, name, iconName)}
      {...rest}>
      {renderComponent}
    </Screen>
  );

  const renderScreens = useCallback(
    () => clientScreens.map(renderScreen),
    [activeScreen],
  );

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: COLOURS.light,
        },
      }}>
      {renderScreens()}
    </Navigator>
  );
};

export { ClientScreens };
