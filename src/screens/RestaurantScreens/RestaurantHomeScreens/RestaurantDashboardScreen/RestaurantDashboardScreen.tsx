import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { type FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { formatCurrency } from "utilities/formatCurrency";
import { parseCurrency } from "utilities/parseCurrency";
import { RestaurantDashboardMealCard } from "./RestaurantDashboardMealCard";
import { useRestaurantQuery } from "./useRestaurantQuery";

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantDashboardScreen"
>;

type RestaurantMealsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantSettingsScreen"
>;

interface Props extends RestaurantStackProps {}

const RestaurantDashboardScreen: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<RestaurantMealsNavigationProp>();
  const { params } = route ?? {};
  const { restaurantID } = params;

  const onPressNavigateToOrders = () =>
    navigate("RestaurantOrdersScreen", { restaurantID });

  const onPressNavigateToMeals = () =>
    navigate("RestaurantMealsScreens", { restaurantID });

  const onPressNavigateToCreateMeal = () =>
    navigate("RestaurantCreateMealScreen", { restaurantID });

  const OnPressNavigateToSettings = () =>
    navigate("RestaurantSettingsScreen", { restaurantID });

  const { data } = useRestaurantQuery({
    variables: {
      id: restaurantID,
    },
    skip: !restaurantID,
  });

  const activeMeal = data?.restaurant?.meals?.find(({ active }) => active);

  const hasMeals = data?.restaurant?.meals.length!!;

  const { price } = activeMeal ?? {};

  const totalQuantityOrdered = data?.restaurant?.orders.reduce(
    (sum, order) => sum + order?.quantity!,
    0,
  );

  const totalRevenue = formatCurrency(
    totalQuantityOrdered! * parseCurrency(price!),
  );

  const renderNonActiveMeals = () =>
    data?.restaurant?.meals.map(({ name, id }) => (
      <Typography key={id} type="S" className=" mb-4">
        - {name}
      </Typography>
    ));

  const renderNoActiveMealCTA = () => {
    if (hasMeals)
      return (
        <Columns direction="column">
          <Column columnWidth="fullWidth" alignItems="center">
            <Typography weigth="bold" type="H3" className="text-center mb-4">
              No Active Meal
            </Typography>
          </Column>
          <Column columnWidth="fullWidth">
            <Typography weigth="bold" type="P" className="text-center mb-4">
              Current list of meals:
            </Typography>
            {renderNonActiveMeals()}
          </Column>
          <Column columnWidth="fullWidth">
            <Button onPress={onPressNavigateToMeals}>Activate a meal</Button>
          </Column>
        </Columns>
      );
    return (
      <Columns direction="column">
        <Column columnWidth="fullWidth" alignItems="center">
          <Typography weigth="bold" type="P" className="text-center mb-4">
            Get started by creating a new meal
          </Typography>
        </Column>
        <Column columnWidth="fullWidth">
          <Button onPress={onPressNavigateToCreateMeal}>
            Create a new meal
          </Button>
        </Column>
      </Columns>
    );
  };

  const renderActiveMeal = () =>
    activeMeal ? (
      <RestaurantDashboardMealCard
        restaurantID={restaurantID}
        onPressNavigateToOrders={onPressNavigateToOrders}
        meal={{ ...activeMeal, totalQuantityOrdered, totalRevenue }}
      />
    ) : (
      <Box>{renderNoActiveMealCTA()}</Box>
    );

  return (
    <Container>
      <Typography
        colour="accent"
        weigth="bold"
        type="H3"
        className="text-center mt-4">
        {data?.restaurant?.name} Dashboard
      </Typography>
      <Columns>
        <Column columnWidth="fullWidth">{renderActiveMeal()}</Column>
      </Columns>
      <Columns>
        <Column columnWidth="half">
          <Button
            onPress={OnPressNavigateToSettings}
            isOutlined
            theme="primary">
            Settings
          </Button>
        </Column>
        <Column columnWidth="half">
          <Button
            onPress={onPressNavigateToCreateMeal}
            isOutlined
            theme="accent">
            Create meal
          </Button>
        </Column>
      </Columns>
    </Container>
  );
};

export { RestaurantDashboardScreen };
