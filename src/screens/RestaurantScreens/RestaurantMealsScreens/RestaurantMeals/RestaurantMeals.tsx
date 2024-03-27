import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { type FC } from "react";
import { ScrollView } from "react-native";
import type { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";
import {
  RestaurantMealCard,
  SkeletonRestaurantMealCard,
} from "./RestaurantMealCard";
import type { RestaurantMealsQueryData } from "./useRestaurantMealsQuery";
import { useRestaurantMealsQuery } from "./useRestaurantMealsQuery";

type RestaurantMealsStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantMeals"
>;

type Props = RestaurantMealsStackProps;

const RestaurantMeals: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  const { data, loading } = useRestaurantMealsQuery({
    skip: !restaurantID,
    variables: {
      id: restaurantID,
    },
  });

  const activeMealID = data?.restaurant?.meals?.find(
    ({ active }) => active,
  )?.id;

  const renderMeal = (
    meal: RestaurantMealsQueryData["restaurant"]["meals"][number],
  ) => (
    <RestaurantMealCard
      hasActiveMeal={!!activeMealID}
      key={meal.id}
      meal={meal}
      restaurantID={restaurantID}
    />
  );

  const hasMeals = !!data?.restaurant?.meals?.length;

  const renderSkeletons = () =>
    createList(3).map(index => <SkeletonRestaurantMealCard key={index} />);

  const renderNoMealsCTA = () => (
    <Box>
      <Columns direction="column">
        <Column columnWidth="fullWidth" alignItems="center">
          <Typography weigth="bold" type="P" className="text-center mb-4">
            You have no meals created yet
          </Typography>
        </Column>
        <Column columnWidth="fullWidth">
          <Button>Create a new meal</Button>
        </Column>
      </Columns>
    </Box>
  );

  const renderMealCards = () =>
    hasMeals ? data?.restaurant?.meals.map(renderMeal) : renderNoMealsCTA();

  const renderMeals = () => (loading ? renderSkeletons() : renderMealCards());

  return (
    <Container>
      <ScrollView>{renderMeals()}</ScrollView>
    </Container>
  );
};

export { RestaurantMeals };
