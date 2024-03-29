import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Column, Columns, Typography } from "components";
import type { FC } from "react";
import type { User } from "schema";
import type { MealsData } from "screens/ClientScreens/MealsScreen/Meals/useGetMealsQuery";
import type { RootStackParamList } from "types/navigation.types";

interface Props {
  meal: MealsData;
  userID: User["id"];
}

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal"
>;

const formatDate = (input: string): string => {
  const [datePart, timePart] = input.split(" ");
  const utcDate = new Date(datePart + "T" + timePart + "Z");

  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isTomorrow = (d: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);
    return isSameDay(d, tomorrow);
  };

  const formatTime = (d: Date) =>
    `${d.getHours() % 12 || 12}:${d.getMinutes().toString().padStart(2, "0")} ${
      d.getHours() >= 12 ? "PM" : "AM"
    }`;

  if (isSameDay(utcDate, now)) {
    return `Today ${formatTime(utcDate)}`;
  } else if (isTomorrow(utcDate)) {
    return `Tomorrow ${formatTime(utcDate)}`;
  } else {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${weekdays[utcDate.getDay()]} ${formatTime(utcDate)}`;
  }
};

const formatTimeRange = (
  pickupStartTime: string,
  pickupEndTime: string,
): string => {
  const parseTime = (timeString: string) => {
    const [date, time] = timeString.split(" ");
    return { date, time };
  };

  const { date: startDate, time: startTime } = parseTime(pickupStartTime);
  const { time: endTime } = parseTime(pickupEndTime);

  const utcDate = new Date(startDate + "T00:00:00Z");
  const now = new Date();

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isTomorrow = (d: Date) => {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    return isSameDay(d, tomorrow);
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hoursInt = parseInt(hours, 10);
    return `${hoursInt % 12 || 12}:${minutes.padStart(2, "0")} ${
      hoursInt >= 12 ? "PM" : "AM"
    }`;
  };

  if (isSameDay(utcDate, now)) {
    return `Today between ${formatTime(startTime)} and ${formatTime(endTime)}`;
  } else if (isTomorrow(utcDate)) {
    return `Tomorrow between ${formatTime(startTime)} and ${formatTime(
      endTime,
    )}`;
  } else {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${weekdays[utcDate.getDay()]} between ${formatTime(
      startTime,
    )} and ${formatTime(endTime)}`;
  }
};

// Example usage
console.log(
  formatTimeRange("2000-01-01 13:00:00 UTC", "2000-01-01 16:00:00 UTC"),
);

const MealCard: FC<Props> = ({ meal, userID }) => {
  const {
    id,
    restaurant,
    name,
    price,
    description,
    quantityAvailable,
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
        <Column columnWidth="fullWidth">
          <Typography isMarginless type="S">
            Order By:{" "}
          </Typography>
          <Typography type="S" weigth="bold" colour="accent">
            {formatDate(orderCutoffTime)}
          </Typography>
        </Column>
        <Column columnWidth="fullWidth">
          <Typography type="S">Pickup Between:</Typography>
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
