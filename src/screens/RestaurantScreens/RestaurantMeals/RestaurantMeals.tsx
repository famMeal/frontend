import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Columns, Container, Typography } from "components";
import type { FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import {
  useRestaurantOrdersQuery,
  type RestaurantMealData,
} from "../useRestaurantOrdersQuery";
import { RestaurantMealCard } from "./RestaurantMealCard";

type Props = NativeStackScreenProps<RootStackParamList, "RestaurantMeals">;

const RestaurantMeals: FC<Props> = ({ route: { params } }) => {
  const { restaurantID } = params;

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
    <Container>
      <Columns>
        <Column>
          <Box>
            <Typography className="text-center" weigth="bold" type="H3">
              Meals
            </Typography>
          </Box>
        </Column>
      </Columns>
      <Columns>
        <Column>{renderMeals()}</Column>
      </Columns>
    </Container>
  );
};

export { RestaurantMeals };
