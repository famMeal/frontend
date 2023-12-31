import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Typography } from "components";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";
import {
  useRestaurantOrdersQuery,
  type RestaurantMealData,
} from "../useRestaurantOrdersQuery";
import { RestaurantMealCard } from "./RestaurantMealCard";

type RestaurantMealsStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantMeals"
>;

interface Props extends RestaurantMealsStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantMeals: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const { data } = useRestaurantOrdersQuery({
    variables: {
      id: restaurantID,
    },
  });

  const renderMeal = (meal: RestaurantMealData) => (
    <RestaurantMealCard key={meal.id} meal={meal} restaurantID={restaurantID} />
  );

  const renderMeals = () => data?.restaurant?.meals.map(renderMeal);

  return (
    <Container className="m-4">
      <Typography
        colour="accent"
        className="text-center mt-4"
        weigth="bold"
        type="H3">
        Meals
      </Typography>
      {renderMeals()}
    </Container>
  );
};

export { RestaurantMeals };
