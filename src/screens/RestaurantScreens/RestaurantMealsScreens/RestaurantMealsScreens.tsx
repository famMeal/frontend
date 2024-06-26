import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Header } from "components";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { ActivateRestaurantMeal } from "./ActivateRestaurantMeal";
import { RestaurantMeals } from "./RestaurantMeals";
import { RestaurantMealsHeader } from "./RestaurantMealsHeader";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

type RestaurantMealsStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantMealsScreens"
>;

interface Props extends RestaurantMealsStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantMealsScreens: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID, mealID } = params;

  const OnPressNavigateBack = () => navigation.goBack();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name)
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Navigator>
      <Screen
        name="RestaurantMeals"
        component={RestaurantMeals}
        initialParams={{ restaurantID, mealID }}
        options={{
          headerShown: false,
          headerBackground: () => (
            <Header onBackButtonPress={OnPressNavigateBack} title="Meals" />
          ),
        }}
      />
      <Screen
        name="ActivateRestaurantMeal"
        component={ActivateRestaurantMeal}
        options={{
          headerShown: false,
          headerBackground: () => (
            <RestaurantMealsHeader restaurantID={route?.params?.restaurantID} />
          ),
        }}
      />
    </Navigator>
  );
};

export { RestaurantMealsScreens };
