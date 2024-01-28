import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Box,
  Button,
  Chip,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { type FC } from "react";
import { useActivateMealMutation } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { formatCurrency } from "utilities/formatCurrency";
import { formatTime } from "utilities/formatTime";
import { parseCurrency } from "utilities/parseCurrency";
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
  const [toggleActiveStateMeal, { loading }] = useActivateMealMutation();

  const OnPressNavigateToSettings = () =>
    navigate("RestaurantSettingsScreen", { restaurantID });

  const onPressNavigateToOrders = () =>
    navigate("ActiveOrders", { restaurantID });

  const OnPressNavigateToCreate = () =>
    navigate("CreateMeal", { restaurantID });

  const { data } = useRestaurantQuery({
    variables: {
      id: restaurantID,
    },
    skip: !restaurantID,
  });

  const activeMeal = data?.restaurant?.meals?.find(({ active }) => active);

  const mealWithOrders = data?.restaurant?.orders?.[0].meal;

  const {
    name,
    quantityAvailable,
    price,
    pickupStartTime,
    pickupEndTime,
    id,
    active,
  } = (activeMeal || mealWithOrders) ?? {};

  const totalQuantityOrdered = data?.restaurant?.orders.reduce(
    (sum, order) => sum + order?.quantity!,
    0,
  );

  const totalRevenue = formatCurrency(
    totalQuantityOrdered! * parseCurrency(price!),
  );

  const onPressToggleActiveStateMeal = () =>
    toggleActiveStateMeal({
      variables: {
        input: {
          mealId: id!,
          active: !active,
        },
      },
    });

  return (
    <Container>
      <Typography
        colour="accent"
        weigth="bold"
        type="H3"
        className="text-center mt-4">
        {data?.restaurant?.name}
      </Typography>
      {/*
      <Columns>
        <Column>
          <Box>
            <Button onPress={OnPressNavigateToSettings}>settings</Button>
          </Box>
        </Column>
        <Column>
          <Box>
            <Button theme="accent" onPress={OnPressNavigateToCreate}>
              Create Meal
            </Button>
          </Box>
        </Column>
      </Columns> */}

      <Columns>
        <Column columnWidth="fullWidth" justifyContent="center"></Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth">
          <Box>
            <Chip type={active ? "success" : "primary"}>
              {active ? "Active" : "Disabled"}
            </Chip>
            <Accordion>
              <AccordionHeader>
                <Typography className="mt-12" colour="accent" weigth="bold">
                  {name}
                </Typography>
                <Columns isMarginless>
                  <Column>
                    <Typography type="S" weigth="bold">
                      Available:{" "}
                      <Typography colour="accent" type="S">
                        {" "}
                        {quantityAvailable}
                      </Typography>
                    </Typography>
                  </Column>
                  <Column>
                    <Typography type="S" weigth="bold">
                      Reserved:{" "}
                      <Typography colour="accent" type="S">
                        {" "}
                        {totalQuantityOrdered}
                      </Typography>
                    </Typography>
                  </Column>
                </Columns>
              </AccordionHeader>
              <AccordionContent>
                <Columns>
                  <Column>
                    <Typography type="S" weigth="bold">
                      Remaining:{" "}
                      <Typography type="S">
                        {" "}
                        {quantityAvailable! - totalQuantityOrdered!}
                      </Typography>
                    </Typography>
                  </Column>
                  <Column>
                    <Typography type="S" weigth="bold">
                      Revenue: <Typography type="S"> {totalRevenue}</Typography>
                    </Typography>
                  </Column>
                </Columns>
                <Columns>
                  <Column columnWidth="fullWidth">
                    <Typography type="S" isMarginless weigth="bold">
                      Pickup between:
                      <Typography isMarginless type="S">
                        {" "}
                        {formatTime(pickupStartTime)} and{" "}
                      </Typography>
                      <Typography isMarginless type="S">
                        {formatTime(pickupEndTime)}
                      </Typography>
                    </Typography>
                  </Column>
                </Columns>
                <Columns>
                  <Column>
                    <Button
                      onPress={onPressToggleActiveStateMeal}
                      isLoading={loading}
                      theme="accent">
                      {active ? "Deactivate" : "Activate"}
                    </Button>
                  </Column>
                  <Column>
                    <Button onPress={onPressNavigateToOrders}>
                      View orders
                    </Button>
                  </Column>
                </Columns>
              </AccordionContent>
            </Accordion>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { RestaurantDashboardScreen };
