import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import type {
  MainNavigationProps,
  RootStackParamList,
} from "types/navigation.types";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { MealScreen } from "screens/MealsScreen/MealScreen";
import { MealsScreen } from "screens/MealsScreen";
import { useNavigation } from "@react-navigation/native";
import { MainHeader } from "./MainHeader/MainHeader";
const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

type MainStackProps = NativeStackScreenProps<RootStackParamList, "Main">;

interface Props extends MainStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const MainScreen: FC<Props> = ({ route, setActiveScreen }) => {
  const navigation = useNavigation<MainNavigationProps>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name)
    );
    return unsubscribe;
  }, [navigation, route.params, route.name]);

  return (
    <Navigator>
      <Screen
        name="Meals"
        component={MealsScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name="Meal"
        component={MealScreen}
        options={({ route }) => ({
          headerShown: false,
          headerBackground: () => (
            <MainHeader title={route?.params?.restaurantName} />
          ),
        })}
      />
    </Navigator>
  );
};

export { MainScreen };
