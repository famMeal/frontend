import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Chip,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import React, { useState, type FC } from "react";
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

const RestaurantMeals: FC<Props> = ({ route, navigation }) => {
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
      isStripeOnBoardingComplete={data?.restaurant?.stripeOnboardingComplete}
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

  const onPressNavigateToSettings = () =>
    navigation.navigate("RestaurantSettingsScreen", { restaurantID });

  const addMealCTA = () =>
    hasMeals ? (
      <Box className="mb-0">
        <Button onPress={() => setIsModalOpen(true)} theme="accent">
          Add Meal
        </Button>
      </Box>
    ) : null;

  const renderStripeCTA = () =>
    loading ? (
      <SkeletonRestaurantMealCard key={1} />
    ) : !data?.restaurant?.stripeOnboardingComplete ? (
      <Box>
        <Columns>
          <Column columnWidth="twoThird">
            <Typography weigth="bold" type="H3">
              Payment Account
            </Typography>
          </Column>
          <Column columnWidth="oneThird" alignItems="flex-end">
            <Chip isStatic type="error">
              Attention
            </Chip>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography type="S">
              Your payment account needs attention. You cannot activate a meal
              without a valid payment account.
            </Typography>
          </Column>
        </Columns>
        <Button isOutlined theme="error" onPress={onPressNavigateToSettings}>
          Setup Payment Account
        </Button>
      </Box>
    ) : null;

  return (
    <Container>
      {renderStripeCTA()}
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
