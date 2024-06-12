import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Column,
  Columns,
  Container,
  GoogleMap,
  Skeleton,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { SquirrelIcon } from "lucide-react-native";
import type { FC } from "react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, PermissionsAndroid, Platform, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import type MapView from "react-native-maps";
import type { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";
import { MealCard, SkeletonMealCard } from "./MealCard";
import { useGetMealsLocationQuery } from "./useGetMealsLocationQuery";
import type { MealsData, MealsQueryData } from "./useGetMealsQuery";
import { useGetMealsQuery } from "./useGetMealsQuery";

type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

const filterMeals = (meals?: MealsQueryData["meals"]) => {
  const currentTime = new Date();
  return __DEV__
    ? meals?.filter(({ active }) => active)
    : meals?.filter(
        ({
          active,
          restaurant: { stripeOnboardingComplete },
          orderCutoffTime,
        }) =>
          active &&
          stripeOnboardingComplete &&
          new Date(orderCutoffTime) > currentTime
      );
};

const MealsScreen: FC<Props> = ({ route: { params } }) => {
  const { userID } = params;
  const mapRef = useRef<MapView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList<MealsData>>(null);
  const { data, loading: isMealsLocationLoading } = useGetMealsLocationQuery();
  const { meals } = data ?? {};
  const {
    data: mealsData,
    refetch,
    loading,
  } = useGetMealsQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const locations = meals
    ?.filter(meal => meal.active)
    ?.map(({ restaurant }) => ({
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      name: restaurant.name,
      id: restaurant.meals.find(({ active }) => active)?.id,
    }))
    .filter(loc => loc.id && loc.latitude && loc.longitude);

  const handleMapReady = useCallback(() => {
    const coordinates = locations?.map(({ latitude, longitude }) => ({
      latitude: latitude!,
      longitude: longitude!,
    }));
    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }, [locations]);

  const handleOnPressMarker = useCallback(
    (restaurantId: string) => {
      const index = mealsData?.meals.findIndex(
        meal => meal.restaurant.id === restaurantId
      );
      if (
        index !== -1 &&
        index !== undefined &&
        mealsData &&
        index < mealsData.meals.length
      ) {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }
    },
    [mealsData]
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const renderSkeleton = (index: number) => <SkeletonMealCard key={index} />;

  const renderSkeletons = useCallback(
    () => createList(3).map(renderSkeleton),
    []
  );

  const batchedMeals = filterMeals(mealsData?.meals) ?? [];

  const renderMap = () =>
    isMealsLocationLoading ? (
      <Skeleton width="full" />
    ) : (
      <GoogleMap
        ref={mapRef}
        coordinates={locations?.map(loc => ({
          coordinate: {
            latitude: loc.latitude!,
            longitude: loc.longitude!,
          },
          title: loc.name,
          onPress: () => handleOnPressMarker(loc.id!),
        }))}
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

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.error("Error getting location:", error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      }
    };

    getLocation();
  }, []);

  const handleRestaurantNamePress = (latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const ListEmptyComponent = loading ? (
    <>{renderSkeletons()}</>
  ) : (
    <Box>
      <Columns>
        <Column
          columnWidth="fullWidth"
          justifyContent="center"
          alignItems="center">
          <Typography weigth="semiBold">
            No meals available. Pull down to refresh.
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column
          columnWidth="fullWidth"
          justifyContent="center"
          alignItems="center">
          <SquirrelIcon size={50} color={COLOURS.primary} />
        </Column>
      </Columns>
    </Box>
  );

  return (
    <>
      <View className="h-64">{renderMap()}</View>
      <Container>
        <FlatList
          ref={flatListRef}
          data={batchedMeals}
          renderItem={({ item }) => (
            <MealCard
              onRestaurantNamePress={handleRestaurantNamePress}
              userID={userID}
              meal={item}
              userLocation={userLocation}
            />
          )}
          keyExtractor={({ id }) => id}
          ListEmptyComponent={ListEmptyComponent}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onContentSizeChange={handleMapReady}
        />
      </Container>
    </>
  );
};

export { MealsScreen };
