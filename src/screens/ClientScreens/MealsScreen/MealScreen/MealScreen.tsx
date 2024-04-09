import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, Container, GoogleMap, Skeleton } from "components";
import type { FC } from "react";
import { useCallback, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import type MapView from "react-native-maps";
import { OrderStatusField } from "schema";
import type {
  GetOrderQueryData,
  GetOrderQueryVariables,
} from "shared/useGetOrderQuery";
import { GET_ORDER_QUERY, useGetOrderQuery } from "shared/useGetOrderQuery";
import type {
  ConfirmationNavigationProps,
  RootStackParamList,
} from "types/navigation.types";
import { formatTimeToUTC } from "utilities/time";
import {
  RestaurantMealCard,
  SkeletonRestaurantMealCard,
} from "./RestaurantMealCard";
import { useUpdateOrderMutation } from "./useUpdateOrderMutation";

type Props = NativeStackScreenProps<RootStackParamList, "Meal">;

const MealScreen: FC<Props> = ({ route: { params } }) => {
  const { orderID, userID } = params;
  const { data, loading } = useGetOrderQuery({
    variables: {
      id: orderID,
    },
    skip: !orderID,
  });

  const mapRef = useRef<MapView>(null);
  const { navigate } = useNavigation<ConfirmationNavigationProps>();
  const { meal, restaurant } = data?.order ?? {};

  const [quantity, setQuantity] = useState(1);

  const [[pickupStartTime, pickupEndTime], setSelectedTime] = useState<
    string[]
  >([]);

  const [updateOrder, { loading: isUpdateLoading }] = useUpdateOrderMutation();

  const onContinuePress = () => {
    updateOrder({
      variables: {
        input: {
          orderId: orderID,
          pickupStartTime: formatTimeToUTC(pickupStartTime!),
          pickupEndTime: formatTimeToUTC(pickupEndTime!),
          quantity,
          status: OrderStatusField.Cart,
        },
      },
      update: (cache, { data }) => {
        const cacheData = cache?.readQuery<
          GetOrderQueryData,
          GetOrderQueryVariables
        >({
          query: GET_ORDER_QUERY,
          variables: {
            id: orderID,
          },
        });

        if (cacheData?.order) {
          cache.writeQuery<GetOrderQueryData, GetOrderQueryVariables>({
            query: GET_ORDER_QUERY,
            variables: {
              id: orderID,
            },
            data: {
              order: {
                ...cacheData?.order,
                ...data?.updateOrder,
              },
            },
          });
        }
      },
      onCompleted: ({ updateOrder }) => {
        if (updateOrder?.order) {
          navigate("Confirmation", {
            userID,
            orderID: updateOrder?.order?.id,
            cart: updateOrder?.order,
          });
        }
      },
    });
  };

  const renderMeal = () =>
    loading ? (
      <SkeletonRestaurantMealCard />
    ) : (
      <RestaurantMealCard
        orderID={orderID}
        userID={userID}
        quantity={quantity}
        setQuantity={setQuantity}
        selectedTime={[pickupStartTime, pickupEndTime]}
        setSelectedTime={setSelectedTime}
        meal={meal}
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
      ),
    [loading, restaurant?.latitude, restaurant?.longitude]
  );

  const renderCTA = () =>
    loading ? (
      <Skeleton size="large" />
    ) : (
      <Button
        isLoading={isUpdateLoading}
        onPress={onContinuePress}
        disabled={!pickupEndTime || !pickupStartTime}>
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
