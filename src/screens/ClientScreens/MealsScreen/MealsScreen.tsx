import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, GoogleMap, Skeleton } from "components";
import type { FC } from "react";
import React, { useCallback, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import type MapView from "react-native-maps";
import type { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";
import { MealCard, SkeletonMealCard } from "./MealCard";
import { useGetMealsLocationQuery } from "./useGetMealsLocationQuery";
import type { MealsData } from "./useGetMealsQuery";
import { useGetMealsQuery } from "./useGetMealsQuery";

type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

const MealsScreen: FC<Props> = ({ route: { params } }) => {
  const { userID } = params;
  const mapRef = useRef<MapView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList<MealsData>>(null);
  const { data, loading, refetch } = useGetMealsLocationQuery();
  const { meals } = data ?? {};
  const { data: mealsData } = useGetMealsQuery();

  const locations = meals
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
  return (
    <>
      <View className="h-64">
        {loading ? (
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
        )}
      </View>
      <Container>
        <FlatList
          ref={flatListRef}
          data={mealsData?.meals.filter(meal => meal.active) || []}
          renderItem={({ item }) => (
            <MealCard userID={userID} key={item.id} meal={item} />
          )}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={renderSkeletons}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onContentSizeChange={handleMapReady}
        />
      </Container>
    </>
  );
};

export { MealsScreen };
