import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Container, GoogleMap, Skeleton } from "components";
import type { FC } from "react";
import { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import type MapView from "react-native-maps";
import type {
  ConfirmationNavigationProps,
  RootStackParamList,
} from "types/navigation.types";
import { createTimeArray } from "utilities";
import {
  RestaurantMealCard,
  SkeletonRestaurantMealCard,
} from "./RestaurantMealCard";
import { useGetRestaurantMealQuery } from "./useGetRestaurantMealQuery";

type Props = NativeStackScreenProps<RootStackParamList, "Meal">;

const MealScreen: FC<Props> = ({ route: { params } }) => {
  const mapRef = useRef<MapView>(null);
  const { restaurantID, mealID } = params;
  const { data, loading } = useGetRestaurantMealQuery({
    variables: {
      id: restaurantID,
    },
    skip: !restaurantID,
  });

  const { meals, longitude, latitude } = data?.restaurant ?? {};

  const meal = meals?.find(({ id }) => id === mealID);

  const { navigate } = useNavigation<ConfirmationNavigationProps>();

  const handleOnPressContinue = () => navigate("Confirmation");

  const timeIntervals = createTimeArray(
    meal?.pickupStartTime,
    meal?.pickupEndTime,
  );

  const [selectedTime, setSelectedTime] = useState(timeIntervals[0]);

  const renderMeal = useCallback(
    () =>
      loading ? (
        <SkeletonRestaurantMealCard />
      ) : (
        <RestaurantMealCard
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          meal={{ ...meal!, id: mealID! }}
        />
      ),
    [loading],
  );

  const renderMap = useCallback(
    () =>
      loading ? (
        <Skeleton size="large" />
      ) : (
        <GoogleMap
          ref={mapRef}
          destination={{ latitude: latitude!, longitude: longitude! }}
        />
      ),
    [loading],
  );

  const renderCTA = useCallback(
    () =>
      loading ? (
        <Skeleton size="large" />
      ) : (
        <Button onPress={handleOnPressContinue}>Continue</Button>
      ),
    [loading],
  );

  return (
    <Container className="flex flex-col justify-between">
      <View className="h-36">{renderMap()}</View>
      <ScrollView className="px-4 pt-4">{renderMeal()}</ScrollView>
      <View className="mx-4">
        <Box>{renderCTA()}</Box>
      </View>
    </Container>
  );
};

export { MealScreen };
