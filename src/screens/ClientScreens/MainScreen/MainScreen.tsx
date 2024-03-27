import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import { MealsScreen } from "screens/ClientScreens/MealsScreen";
import { MealScreen } from "screens/ClientScreens/MealsScreen/MealScreen";
import type {
  MainNavigationProps,
  RootStackParamList,
} from "types/navigation.types";
import { MainHeader } from "./MainHeader";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

type MainStackProps = NativeStackScreenProps<RootStackParamList, "Main">;

interface Props extends MainStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const MainScreen: FC<Props> = ({ route, setActiveScreen }) => {
  const navigation = useNavigation<MainNavigationProps>();
  const { userID } = route?.params ?? {};

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, route.params, route.name, setActiveScreen]);

  return (
    <Navigator>
      <Screen
        name="Meals"
        component={MealsScreen}
        options={{ headerShown: false }}
        initialParams={{ userID }}
      />
      <Screen
        initialParams={{ userID }}
        name="Meal"
        component={MealScreen}
        options={({ route }) => ({
          headerShown: false,
          headerBackground: () => (
            <MainHeader userID={userID} title={route?.params?.restaurantName} />
          ),
        })}
      />
    </Navigator>
  );
};

export { MainScreen };
