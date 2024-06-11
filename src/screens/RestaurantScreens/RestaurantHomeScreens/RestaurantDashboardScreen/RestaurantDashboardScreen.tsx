import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Chip,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { STATUS } from "constants/status";
import { ArrowRightCircle } from "lucide-react-native";
import React, { useCallback, useState, type FC } from "react";
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { DateRangeField, type Meal } from "schema";
import { RestaurantCreateMealModal } from "screens/RestaurantScreens/RestaurantCreateMealModal";
import type { RootStackParamList } from "types/navigation.types";
import { formatCurrency } from "utilities/formatCurrency";
import { parseCurrency } from "utilities/parseCurrency";
import { RestaurantDashboardMealCard } from "./RestaurantDashboardMealCard";
import { SkeletonRestaurantDashboardScreens } from "./SkeletonRestaurantDashboardScreen";
import type { OrderSplinter } from "./useRestaurantQuery";
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

type Order = {
  [x: string]: OrderSplinter[];
};

const RestaurantDashboardScreen: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<RestaurantMealsNavigationProp>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { params } = route ?? {};
  const { restaurantID } = params;

  const onPressNavigateToOrders = () =>
    navigate("RestaurantOrdersScreen", { restaurantID });

  const onPressNavigateToActivateMeal = (mealID: Meal["id"]) =>
    navigate("RestaurantMealsScreens", { restaurantID, mealID });

  const onPressNavigateToCreateMeal = () => setIsModalOpen(true);

  const onPressNavigateToSettings = () =>
    navigate("RestaurantSettingsScreen", { restaurantID });

  const { data, loading, refetch } = useRestaurantQuery({
    variables: {
      id: restaurantID,
      filters: {
        dateRange: DateRangeField.Today,
      },
    },
    skip: !restaurantID,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const activeMealId = data?.restaurant?.meals?.find(
    ({ active }) => active
  )?.id;

  const hasMeals = data?.restaurant?.meals.length!;

  const mealsWithOrders =
    data?.restaurant?.orders?.reduce((acc, order) => {
      const mealName = order.meal.name;
      if (!acc[mealName]) {
        acc[mealName] = [];
      }
      acc[mealName].push(order);
      return acc;
    }, {} as { [key: string]: OrderSplinter[] }) ?? {};

  const ordersByMeal = Object.keys(mealsWithOrders).map(key => ({
    [key]: mealsWithOrders[key],
  }));

  const renderOrderByMeal = (order: Order, index: number) => {
    const mealName = Object.keys(order)[0];
    const mealOrders = order[mealName];

    const totalNumOfPickedUp = mealOrders.reduce((acc, order) => {
      return order.status === STATUS.COMPLETED ? acc + order.quantity! : acc;
    }, 0);

    const totalQuantityOrdered = mealOrders.reduce(
      (sum, order) => sum + order?.quantity!,
      0
    );

    const totalRevenue = formatCurrency(
      totalQuantityOrdered! * parseCurrency(mealOrders[0].meal.price!)
    );

    const meal = {
      ...mealOrders[0].meal,
      totalRevenue,
      totalQuantityOrdered: Number(totalQuantityOrdered),
    };

    return (
      <RestaurantDashboardMealCard
        totalNumOfPickedUp={totalNumOfPickedUp}
        index={index}
        activeMealId={activeMealId}
        key={Object.keys(order)[0] + index}
        restaurantID={restaurantID}
        onPressNavigateToOrders={onPressNavigateToOrders}
        meal={meal}
      />
    );
  };

  const renderOrders = () => ordersByMeal?.map(renderOrderByMeal);

  const renderOrderMeals = () => {
    if (ordersByMeal.length) {
      return (
        <Box>
          <Typography type="H3" weigth="bold" className=" mb-4">
            Orders
          </Typography>
          {renderOrders()}
        </Box>
      );
    }
    return (
      <Box>
        <Typography type="H3" weigth="bold" className="mb-2">
          No Placed Orders
        </Typography>
        <Typography type="S">Pull down to refresh</Typography>
      </Box>
    );
  };

  if (loading && !refreshing) {
    return <SkeletonRestaurantDashboardScreens />;
  }

  const renderCheckMark = (active: boolean) =>
    active ? (
      <Chip isStatic type="success">
        Active
      </Chip>
    ) : null;

  const renderNonActiveMeals = () =>
    data?.restaurant?.meals.map(({ name, id, active }) => (
      <TouchableOpacity
        key={id}
        onPress={() => onPressNavigateToActivateMeal(id)}>
        <Columns className="border-b border-accent pb-2 ">
          <Column columnWidth="twoThird" direction="row">
            <Typography type="S" isMarginless className="mr-2">
              {name}
            </Typography>
            {renderCheckMark(active)}
          </Column>
          <Column
            columnWidth="oneThird"
            direction="row"
            justifyContent="flex-end">
            <Typography weigth="semiBold" isMarginless type="S">
              View
            </Typography>
            <View className="ml-4">
              <ArrowRightCircle size={25} color={COLOURS.primary} />
            </View>
          </Column>
        </Columns>
      </TouchableOpacity>
    ));

  const renderAllMeals = () => {
    if (hasMeals) {
      return (
        <Box>
          <Columns direction="column">
            <Column
              columnWidth="fullWidth"
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Typography weigth="bold" type="H3">
                Meals
              </Typography>
            </Column>
            {renderNonActiveMeals()}
          </Columns>

          <Columns direction="column" isMarginless>
            <Column columnWidth="fullWidth">
              <Button onPress={onPressNavigateToCreateMeal} theme="accent">
                Create New Meal
              </Button>
            </Column>
          </Columns>
        </Box>
      );
    }
    return (
      <Box>
        <Columns isMarginless direction="column">
          <Column columnWidth="fullWidth">
            <Typography weigth="bold" type="H3" className=" mb-4">
              Get started
            </Typography>
            <Typography type="S">
              Create your first meal and starting making money
            </Typography>
          </Column>
          <Column columnWidth="fullWidth">
            <Button className="mt-4" onPress={onPressNavigateToCreateMeal}>
              Create a new meal
            </Button>
          </Column>
        </Columns>
      </Box>
    );
  };

  const renderSettingsText = () =>
    data?.restaurant?.stripeOnboardingComplete ? (
      <Typography type="S">
        Update your restaurant information and payment details
      </Typography>
    ) : (
      <Typography type="S">
        Your payment account needs attention. You cannot activate a meal without
        a valid payment account.
      </Typography>
    );

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {renderOrderMeals()}
        {renderAllMeals()}
        <Box>
          <Columns direction="column" isMarginless>
            <Column columnWidth="fullWidth">
              <Typography weigth="bold" type="H3">
                Settings
              </Typography>
              {renderSettingsText()}
            </Column>
            <Column columnWidth="fullWidth">
              <Button
                isOutlined={!data?.restaurant?.stripeOnboardingComplete}
                className="mt-4"
                onPress={onPressNavigateToSettings}
                theme={
                  data?.restaurant?.stripeOnboardingComplete
                    ? "primary"
                    : "error"
                }>
                {data?.restaurant?.stripeOnboardingComplete
                  ? "View Settings"
                  : "Update Payments Account"}
              </Button>
            </Column>
          </Columns>
        </Box>
      </ScrollView>
      <RestaurantCreateMealModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        restaurantID={restaurantID}
      />
    </Container>
  );
};

export { RestaurantDashboardScreen };
