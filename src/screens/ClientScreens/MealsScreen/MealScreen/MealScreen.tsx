import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapboxGL, {
  Camera,
  LineLayer,
  MapView,
  MarkerView,
  ShapeSource,
} from "@rnmapbox/maps";
import { Box, Button, Container, MapMarker, Skeleton } from "components";
import { COLOURS } from "constants/colours";
import { SquirrelIcon } from "lucide-react-native";
import type { FC } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Platform, ScrollView, View } from "react-native";
import { MAPBOX_DOWNLOADS_TOKEN } from "react-native-dotenv";
import Geolocation from "react-native-geolocation-service";
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
MapboxGL.setAccessToken(MAPBOX_DOWNLOADS_TOKEN);

const MealScreen: FC<Props> = ({ route: { params } }) => {
  const { orderID, userID } = params;
  const { data, loading } = useGetOrderQuery({
    variables: {
      id: orderID,
    },
    skip: !orderID,
  });

  const mapRef = useRef<MapView>(null);
  const cameraRef = useRef<Camera>(null);
  const { navigate } = useNavigation<ConfirmationNavigationProps>();
  const { meal, restaurant } = data?.order ?? {};

  const [quantity, setQuantity] = useState(1);
  const [[pickupStartTime, pickupEndTime], setSelectedTime] = useState<
    string[]
  >([]);
  const [updateOrder, { loading: isUpdateLoading }] = useUpdateOrderMutation();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<number[][] | null>(
    null
  );

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
          navigate("Cart", {
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

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const getRoute = async (from: [number, number], to: [number, number]) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?geometries=geojson&access_token=${MAPBOX_DOWNLOADS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = data.routes[0].geometry.coordinates;
    setRouteCoordinates(coordinates);
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const userCoords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setUserLocation(userCoords);
            if (restaurant) {
              getRoute(
                [userCoords.longitude, userCoords.latitude],
                [restaurant.longitude!, restaurant.latitude!]
              );
            }
          },
          error => {
            console.error("Error getting location:", error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    getLocation();
  }, [restaurant]);

  const renderMap = useCallback(() => {
    if (loading || !restaurant || !userLocation) {
      return <Skeleton size="large" />;
    }

    const destination = [restaurant.longitude!, restaurant.latitude!];

    return (
      <MapView
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        ref={mapRef}
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Street}>
        <Camera ref={cameraRef} centerCoordinate={destination} zoomLevel={14} />
        <MarkerView coordinate={destination}>
          <MapMarker />
        </MarkerView>
        {userLocation && (
          <MarkerView
            coordinate={[userLocation.longitude, userLocation.latitude]}>
            <MapMarker
              theme="primary"
              icon={<SquirrelIcon size={20} color={COLOURS.white} />}
            />
          </MarkerView>
        )}
        {routeCoordinates && (
          <ShapeSource
            id="routeSource"
            shape={{
              properties: {},
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates,
              },
            }}>
            <LineLayer
              id="routeLayer"
              style={{ lineColor: COLOURS.accent, lineWidth: 5 }}
            />
          </ShapeSource>
        )}
      </MapView>
    );
  }, [loading, restaurant, userLocation, routeCoordinates]);

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
