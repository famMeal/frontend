import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { Footprints } from "lucide-react-native";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import { TouchableOpacity } from "react-native-gesture-handler";
import type { Order, User } from "schema";
import type { RootStackParamList } from "types/navigation.types";
import {
  formatStringToReadableTime,
  getDateInReadableFormat,
} from "utilities/time";
import type { MealsData } from "../useGetMealsQuery";
import { useAddToCartMutation } from "./useAddToCartMutation";

interface Props {
  meal: MealsData;
  userID: User["id"];
  userLocation: { latitude: number; longitude: number } | null;
  onRestaurantNamePress: (
    latitude: number,
    longitude: number,
    name: string
  ) => void;
}

type MealScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Meal"
>;

const MealCard: FC<Props> = ({
  meal,
  userID,
  userLocation,
  onRestaurantNamePress,
}) => {
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

  const [distance, setDistance] = useState<number | null>(null);
  const [walkingTime, setWalkingTime] = useState<number | null>(null);
  const fetchCalledRef = useRef(false);

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

  useEffect(() => {
    const fetchDistanceAndTime = async () => {
      if (!userLocation || fetchCalledRef.current) {
        return;
      }
      fetchCalledRef.current = true;

      const origin = `${userLocation.latitude},${userLocation.longitude}`;
      const destination = `${restaurant.latitude},${restaurant.longitude}`;

      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&mode=walking&key=${GOOGLE_API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (
          data.rows &&
          data.rows[0] &&
          data.rows[0].elements &&
          data.rows[0].elements[0]
        ) {
          const distance = data.rows[0].elements[0].distance.value;
          const duration = data.rows[0].elements[0].duration.value;
          setDistance(distance);
          setWalkingTime(Math.ceil(duration / 60));
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching distance and time:", error);
      }
    };

    fetchDistanceAndTime();
  }, [userLocation, restaurant.latitude, restaurant.longitude]);

  const renderCTA = () =>
    !quantityAvailable ? (
      <Typography weigth="bold">Sold Out</Typography>
    ) : (
      <Button isLoading={loading} onPress={handleOnPressReserve}>
        Reserve
      </Button>
    );

  const renderWalkingDistance = () => {
    return distance && walkingTime
      ? `${walkingTime} min walk`
      : "Calculating...";
  };

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
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <TouchableOpacity
            onPress={() =>
              onRestaurantNamePress(
                restaurant.latitude!,
                restaurant.longitude!,
                restaurant?.name
              )
            }>
            <Typography weigth="semiBold" type="S" className="underline">
              {restaurant?.name}{" "}
            </Typography>
          </TouchableOpacity>
        </Column>
        <Column direction="row" justifyContent="flex-end">
          <Footprints className="mr-2" color={COLOURS.primary} />
          <Typography type="S">{renderWalkingDistance()}</Typography>
        </Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography type="S">{description}</Typography>
        </Column>
      </Columns>
      <Columns direction="column">
        <Column columnWidth="fullWidth" direction="row">
          <Typography isMarginless type="S">
            Order By:{" "}
            <Typography isMarginless type="S" weigth="bold" colour="accent">
              {`${getDateInReadableFormat(
                orderCutoffTime
              )}, ${formatStringToReadableTime(orderCutoffTime)}`}
            </Typography>
          </Typography>
        </Column>
        <Column columnWidth="fullWidth" direction="row">
          <Typography isMarginless type="S">
            Pickup:{" "}
            <Typography isMarginless type="S" weigth="bold" colour="accent">
              {`${formatStringToReadableTime(
                pickupStartTime!
              )} and ${formatStringToReadableTime(pickupEndTime!)}`}
            </Typography>
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
          {renderCTA()}
        </Column>
      </Columns>
    </Box>
  );
};

export { MealCard };
