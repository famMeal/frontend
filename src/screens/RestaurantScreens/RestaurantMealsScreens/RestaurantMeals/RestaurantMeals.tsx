import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, Typography } from "components";
import { type FC } from "react";
import { ScrollView } from "react-native";
import type { RestaurantMealData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { useRestaurantOrdersQuery } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import type { RootStackParamList } from "types/navigation.types";
import { RestaurantMealCard } from "../RestaurantMealCard";

type RestaurantMealsStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantMeals"
>;

type Props = RestaurantMealsStackProps;

const RestaurantMeals: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  const { data } = useRestaurantOrdersQuery({
    skip: !restaurantID,
    variables: {
      id: restaurantID,
    },
  });

  const renderMeal = (meal: RestaurantMealData) => (
    <RestaurantMealCard key={meal.id} meal={meal} restaurantID={restaurantID} />
  );

  const renderMeals = () => data?.restaurant?.meals.map(renderMeal);

  return (
    <Container>
      <Typography
        colour="accent"
        className="text-center mt-4"
        weigth="bold"
        type="H3">
        Meals
      </Typography>
      <ScrollView>{renderMeals()}</ScrollView>
    </Container>
  );
};

export { RestaurantMeals };
