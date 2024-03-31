import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Container, GoogleMap, Skeleton } from "components";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import type MapView from "react-native-maps";
import type {
  ConfirmationNavigationProps,
  RootStackParamList,
} from "types/navigation.types";
import {
  RestaurantMealCard,
  SkeletonRestaurantMealCard,
} from "./RestaurantMealCard";
import { useAddToCartMutation } from "./useAddToCartMutation";
import { useGetMealQuery } from "./useGetMealQuery";

type Props = NativeStackScreenProps<RootStackParamList, "Meal">;

const MealScreen: FC<Props> = ({ route: { params } }) => {
  const { mealID, userID } = params;
  const { data, loading } = useGetMealQuery({
    skip: !mealID,
    variables: {
      id: mealID,
    },
  });
  const [addToCart, { loading: isAddToCartLoading }] = useAddToCartMutation();
  const mapRef = useRef<MapView>(null);
  const { navigate } = useNavigation<ConfirmationNavigationProps>();
  const { meal } = data ?? {};
  const { restaurant } = meal ?? {};

  useEffect(() => {
    setBasket(meal);
  }, [meal]);

  const [basket, setBasket] = useState(meal);
  const [quantity, setQuantity] = useState(1);
  const [[pickupStartTime, pickupEndTime], setSelectedTime] = useState<
    string[]
  >([]);

  const handleOnPressContinue = () =>
    addToCart({
      variables: {
        input: {
          mealId: mealID,
          pickupStartTime,
          pickupEndTime,
          quantity,
          userId: userID,
        },
      },
      onCompleted: ({ addToCart: { order } }) => {
        navigate("Confirmation", {
          cart: order,
          userID,
        });
      },
    });

  const renderMeal = () =>
    loading ? (
      <SkeletonRestaurantMealCard />
    ) : (
      <RestaurantMealCard
        userID={userID}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedTime={[pickupStartTime, pickupEndTime]}
        setSelectedTime={setSelectedTime}
        meal={basket}
        setBasket={setBasket}
      />
    );

  const renderMap = useCallback(
    () =>
      loading ? (
        <Skeleton size="large" />
      ) : (
        <GoogleMap
          ref={mapRef}
          destination={{
            latitude: restaurant?.latitude!,
            longitude: restaurant?.longitude!,
            latitudeDelta: 0.005, // Closer zoom
            longitudeDelta: 0.005,
          }}
        />
      ),
    [loading, restaurant?.latitude, restaurant?.longitude],
  );

  const renderCTA = () =>
    loading ? (
      <Skeleton size="large" />
    ) : (
      <Button
        disabled={!pickupEndTime || !pickupStartTime}
        isLoading={isAddToCartLoading}
        onPress={handleOnPressContinue}>
        Continue
      </Button>
    );

  return (
    <Container className="flex flex-col justify-between">
      <View className="h-36">{renderMap()}</View>
      <ScrollView className="mt-4">{renderMeal()}</ScrollView>
      <View className="mx-4">
        <Box>{renderCTA()}</Box>
      </View>
    </Container>
  );
};

export { MealScreen };
