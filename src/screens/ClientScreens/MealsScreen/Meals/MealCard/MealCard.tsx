import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Chip, Column, Columns, Typography } from "components";
import type { FC } from "react";
import { Image } from "react-native";
import type { MealsData } from "screens/ClientScreens/MealsScreen/Meals/useGetMealsQuery";
import type { RootStackParamList } from "types/navigation.types";
import { formatCurrency, formatTime } from "utilities";

interface Props {
  meal: MealsData;
}

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal"
>;

const MealCard: FC<Props> = ({ meal }) => {
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
    });

  return (
    <Box>
      <Chip type="accent">{quantityAvailable} left</Chip>
      <Columns isMarginless>
        <Column className="justify-center" flex="shrink">
          <Image
            className="w-20 h-20 rounded-lg"
            source={{
              uri: "https://source.unsplash.com/featured/?food,chicken",
            }}
          />
        </Column>
        <Column flex="one">
          <Typography isMarginless type="H3" weigth="semiBold">
            {name}
          </Typography>
          <Typography type="S">{description}</Typography>
          <Typography weigth="bold" type="P">
            {restaurant?.name}
          </Typography>
          <Typography type="S">
            Order By:{" "}
            <Typography type="S" weigth="bold" colour="accent">
              {formatTime<MealsData["orderStartTime"]>(orderStartTime)}
            </Typography>
          </Typography>

          <Typography type="S">Pickup Between:</Typography>
          <Typography type="S" weigth="bold" colour="accent">
            {formatTime<MealsData["pickupStartTime"]>(pickupStartTime)} -{" "}
            {formatTime<MealsData["pickupEndTime"]>(pickupEndTime)}
          </Typography>
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column className="items-center justify-center">
          <Typography colour="accent" weigth="semiBold">
            {formatCurrency(price)}
          </Typography>
        </Column>
        <Column>
          <Button onPress={handleOnPressReserve}>Reserve</Button>
        </Column>
      </Columns>
    </Box>
  );
};

export { MealCard };
