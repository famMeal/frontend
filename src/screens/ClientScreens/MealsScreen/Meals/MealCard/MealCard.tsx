import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Chip, Column, Columns, Typography } from "components";
import type { FC } from "react";
import { Image } from "react-native";
import { User } from "schema";
import type { MealsData } from "screens/ClientScreens/MealsScreen/Meals/useGetMealsQuery";
import type { RootStackParamList } from "types/navigation.types";
import { formatTime } from "utilities/formatTime";

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
    orderStartTime,
    quantityAvailable,
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
      <Chip type="accent">{quantityAvailable} left</Chip>
      <Columns>
        <Column columnWidth="oneThird" justifyContent="center">
          <Image
            className="w-20 h-20 rounded-lg"
            source={{
              uri: "https://source.unsplash.com/featured/?food,chicken",
            }}
          />
        </Column>
        <Column columnWidth="twoThird">
          <Typography isMarginless type="H3" weigth="semiBold">
            {name}
          </Typography>
          <Typography type="S">{description}</Typography>
          <Typography weigth="bold" type="P">
            {restaurant?.name}
          </Typography>
          <Typography isMarginless type="S">
            Order By:{" "}
            <Typography type="S" weigth="bold" colour="accent">
              {formatTime<MealsData["orderStartTime"]>(orderStartTime)}
            </Typography>
          </Typography>
          <Typography type="S">Pickup Between:</Typography>
          <Typography isMarginless type="S" weigth="bold" colour="accent">
            {formatTime<MealsData["pickupStartTime"]>(pickupStartTime)} -{" "}
            {formatTime<MealsData["pickupEndTime"]>(pickupEndTime)}
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
