import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Column, Columns, Typography } from "components";
import type { FC } from "react";
import type { User } from "schema";
import type { MealsData } from "screens/ClientScreens/MealsScreen/Meals/useGetMealsQuery";
import type { RootStackParamList } from "types/navigation.types";
import {
  formatDate,
  formatTimeRange,
} from "utilities/formatTimeToReadableTime";

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
  } = meal ?? {};

  const { navigate } = useNavigation<MealScreenNavigationProp>();
  const handleOnPressReserve = () =>
    navigate("Meal", {
      restaurantID: restaurant?.id,
      restaurantName: restaurant?.name,
      mealID: id,
      userID: userID,
    });

  return (
    <Box>
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
          <Button onPress={handleOnPressReserve}>Reserve</Button>
        </Column>
      </Columns>
    </Box>
  );
};

export { MealCard };
