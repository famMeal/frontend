import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { useState, type FC } from "react";
import { ScrollView } from "react-native";
import { RestaurantCreateMealModal } from "screens/RestaurantScreens/RestaurantCreateMealModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { params } = route ?? {};
  const { restaurantID } = params;

  const { data, loading } = useRestaurantMealsQuery({
    skip: !restaurantID,
    variables: {
      id: restaurantID,
    },
  });

  const activeMealID = data?.restaurant?.meals?.find(
    ({ active }) => active
  )?.id;

  const renderMeal = (
    meal: RestaurantMealsQueryData["restaurant"]["meals"][number]
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
        <Column columnWidth="fullWidth">
          <Typography weigth="bold" type="H3" className="mb-4">
            Meals
          </Typography>
          <Typography type="S">
            Create your first meal and starting making money
          </Typography>
        </Column>
        <Column columnWidth="fullWidth">
          <Button className="mt-4" onPress={() => setIsModalOpen(true)}>
            Create a new meal
          </Button>
        </Column>
      </Columns>
    </Box>
  );

  const renderMealCards = () => {
    if (!hasMeals) {
      return renderNoMealsCTA();
    }

    const sortedMeals = [...data.restaurant.meals].sort((a, b) =>
      b.active === a.active ? 0 : a.active ? -1 : 1
    );

    return sortedMeals.map(renderMeal);
  };

  const renderMeals = () => (loading ? renderSkeletons() : renderMealCards());

  const addMealCTA = () =>
    hasMeals ? (
      <Box className="mb-0">
        <Button onPress={() => setIsModalOpen(true)} theme="accent">
          Add Meal
        </Button>
      </Box>
    ) : null;

  return (
    <Container>
      <ScrollView>{renderMeals()}</ScrollView>
      {addMealCTA()}
      <RestaurantCreateMealModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        restaurantID={restaurantID}
      />
    </Container>
  );
};

export { RestaurantMeals };
