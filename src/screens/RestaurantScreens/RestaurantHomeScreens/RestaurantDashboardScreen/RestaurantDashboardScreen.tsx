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
import { COLOURS } from "constants/colours";
import { ArrowRightCircle, BadgeCheck } from "lucide-react-native";
import React, { useState, type FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import type { Meal } from "schema";
import { RestaurantCreateMealModal } from "screens/RestaurantScreens/RestaurantCreateMealModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { params } = route ?? {};
  const { restaurantID } = params;

  const onPressNavigateToOrders = () =>
    navigate("RestaurantOrdersScreen", { restaurantID });

  const onPressNavigateToActivateMeal = (mealID: Meal["id"]) =>
    navigate("RestaurantMealsScreens", { restaurantID, mealID });

  const onPressNavigateToCreateMeal = () => setIsModalOpen(true);

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
    0
  );

  const totalRevenue = formatCurrency(
    totalQuantityOrdered! * parseCurrency(price!)
  );

  const renderActiveMeal = () =>
    activeMeal ? (
      <RestaurantDashboardMealCard
        restaurantID={restaurantID}
        onPressNavigateToOrders={onPressNavigateToOrders}
        meal={{ ...activeMeal, totalQuantityOrdered, totalRevenue }}
      />
    ) : null;

  const renderCheckMark = (active: boolean) =>
    active ? (
      <View className="ml-2 mt-0.5">
        <BadgeCheck size={20} color={COLOURS.accent} />
      </View>
    ) : null;

  const renderNonActiveMeals = () =>
    data?.restaurant?.meals.map(({ name, id, active }) => (
      <TouchableOpacity
        key={id}
        onPress={() => onPressNavigateToActivateMeal(id)}>
        <Columns className="border-b border-accent pb-2 ">
          <Column columnWidth="twoThird" direction="row">
            <Typography isMarginless>{name}</Typography>
            {renderCheckMark(active)}
          </Column>
          <Column
            columnWidth="oneThird"
            direction="row"
            justifyContent="flex-end">
            <Typography weigth="semiBold" isMarginless type="S">
              {activeMeal ? "View" : "View"}
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

  return (
    <Container>
      <ScrollView>
        {renderActiveMeal()}
        {renderAllMeals()}
        <Box>
          <Columns direction="column" isMarginless>
            <Column columnWidth="fullWidth">
              <Typography weigth="bold" type="H3">
                Settings
              </Typography>
              <Typography type="S">
                Update your restaurant information and payment details
              </Typography>
            </Column>
            <Column columnWidth="fullWidth">
              <Button
                className="mt-4"
                onPress={OnPressNavigateToSettings}
                theme="primary">
                View Settings
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
