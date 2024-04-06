import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Chip, Column, Columns, Typography } from "components";
import type { FC } from "react";
import React from "react";
import type { Order, User } from "schema";
import type { MealsData } from "screens/ClientScreens/MealsScreen/Meals/useGetMealsQuery";
import type { RootStackParamList } from "types/navigation.types";
import {
  formatDate,
  formatTimeRange,
} from "utilities/formatTimeToReadableTime";
import { useAddToCartMutation } from "./useAddToCartMutation";

interface Props {
  meal: MealsData;
  userID: User["id"];
}

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal"
>;

const MealCard: FC<Props> = ({ meal, userID }) => {
  const {
    id,
    restaurant,
    name,
    price,
    description,
    orderCutoffTime,
    pickupEndTime,
    pickupStartTime,
    quantityAvailable,
  } = meal ?? {};

  const { navigate } = useNavigation<MealScreenNavigationProp>();
  const [addToCart, { loading }] = useAddToCartMutation();

  const onCompletedNavigateToMealScreen = (orderID: Order["id"]) =>
    navigate("Meal", {
      restaurantName: restaurant?.name,
      userID: userID,
      orderID: orderID,
    });

  const handleOnPressReserve = () =>
    addToCart({
      variables: {
        input: {
          mealId: id,
          pickupStartTime,
          pickupEndTime,
          quantity: 1,
          userId: userID,
        },
      },
      onCompleted: ({ addToCart }) =>
        onCompletedNavigateToMealScreen(addToCart?.order?.id),
    });

  return (
    <Box>
      <Chip type="accent" icon={null} position="topRight">
        {quantityAvailable} Left
      </Chip>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography isMarginless type="H3" weigth="semiBold">
            {name}
          </Typography>
          <Typography weigth="semiBold" type="P">
            {restaurant?.name}
          </Typography>
          <Typography type="S">{description}</Typography>
        </Column>
      </Columns>
      <Columns direction="column">
        <Column columnWidth="fullWidth" direction="row">
          <Typography isMarginless type="S">
            Order By:{" "}
          </Typography>
          <Typography isMarginless type="S" weigth="bold" colour="accent">
            {formatDate(orderCutoffTime)}
          </Typography>
        </Column>
        <Column columnWidth="fullWidth" direction="row">
          <Typography isMarginless type="S">
            Pickup:{" "}
          </Typography>
          <Typography isMarginless type="S" weigth="bold" colour="accent">
            {formatTimeRange(pickupStartTime, pickupEndTime)}
          </Typography>
        </Column>
      </Columns>

      <Columns isMarginless>
        <Column
          alignItems="center"
          justifyContent="center"
          columnWidth="oneThird">
          <Typography colour="accent" weigth="semiBold">
            {price}
          </Typography>
        </Column>
        <Column columnWidth="twoThird" alignItems="center">
          <Button isLoading={loading} onPress={handleOnPressReserve}>
            Reserve
          </Button>
        </Column>
      </Columns>
    </Box>
  );
};

export { MealCard };
