import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapboxGL, { Camera, MapView, MarkerView } from "@rnmapbox/maps";
import {
  Box,
  Column,
  Columns,
  Container,
  MapMarker,
  Skeleton,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { SquirrelIcon } from "lucide-react-native";
import type { FC } from "react";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, PermissionsAndroid, Platform, View } from "react-native";
import { MAPBOX_DOWNLOADS_TOKEN } from "react-native-dotenv";
import Geolocation from "react-native-geolocation-service";
import type { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";

import type { CameraRef } from "@rnmapbox/maps/lib/typescript/src/components/Camera";
import { filterMeals } from "utilities";
import { MealCard, SkeletonMealCard } from "./MealCard";
import { useGetMealsLocationQuery } from "./useGetMealsLocationQuery";
import type { MealsData } from "./useGetMealsQuery";
import { useGetMealsQuery } from "./useGetMealsQuery";

MapboxGL.setAccessToken(MAPBOX_DOWNLOADS_TOKEN);

type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

const MemoizedMealCard = memo(MealCard);

const MealsScreen: FC<Props> = ({ route: { params } }) => {
  const { userID } = params;
  const mapRef = useRef<MapView>(null);
  const cameraRef = useRef<CameraRef>(null);
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

  const [selectedRestaurant, setSelectedRestaurant] = useState<{
    latitude: number;
    longitude: number;
    name: string;
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
    const coordinates = locations?.map(({ latitude, longitude }) => [
      longitude!,
      latitude!,
    ]);
    if (coordinates && coordinates.length > 0 && cameraRef.current) {
      const bounds = {
        ne: [
          Math.max(...coordinates.map(coord => coord[0])),
          Math.max(...coordinates.map(coord => coord[1])),
        ],
        sw: [
          Math.min(...coordinates.map(coord => coord[0])),
          Math.min(...coordinates.map(coord => coord[1])),
        ],
      };
      cameraRef.current.fitBounds(bounds.ne, bounds.sw, 50, 1000);
    }
  }, [locations]);

  const handleOnPressMarker = useCallback(
    (restaurantId?: string) => {
      if (restaurantId) {
        const { restaurant } =
          mealsData?.meals?.find(meal => meal.restaurant.id === restaurantId) ??
          {};
        setSelectedRestaurant({
          latitude: restaurant?.latitude!,
          longitude: restaurant?.longitude!,
          name: restaurant?.name!,
        });

        cameraRef.current?.setCamera({
          centerCoordinate: [restaurant?.longitude!, restaurant?.latitude!],
          zoomLevel: 15,
          animationDuration: 1000,
        });

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

  const renderLocations = () =>
    locations?.map(loc => (
      <MarkerView
        key={loc.id}
        coordinate={[loc.longitude!, loc.latitude!]}
        anchor={{ x: 0.5, y: 1 }}>
        <MapMarker id={loc.id} onClick={handleOnPressMarker} />
      </MarkerView>
    ));

  const renderUserLocation = () => {
    if (!userLocation) {
      return null;
    }
    return (
      <MarkerView
        key="userLocation"
        coordinate={[userLocation.longitude, userLocation.latitude]}
        anchor={{ x: 0.5, y: 1 }}>
        <MapMarker
          theme="primary"
          icon={<SquirrelIcon size={20} color={COLOURS.white} />}
        />
      </MarkerView>
    );
  };

  const renderSelectedRestaurant = () => {
    if (!selectedRestaurant) {
      return null;
    }
    return (
      <MarkerView
        key="selectedRestaurant"
        coordinate={[selectedRestaurant.longitude, selectedRestaurant.latitude]}
        anchor={{ x: 0.5, y: 1 }}>
        <View style={{ alignItems: "center" }}>
          <Typography
            weigth="semiBold"
            type="S"
            style={{
              backgroundColor: "white",
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              borderRadius: 8,
            }}>
            {selectedRestaurant.name}
          </Typography>
          <MapMarker theme="primary" />
        </View>
      </MarkerView>
    );
  };

  const renderMap = () =>
    isMealsLocationLoading ? (
      <Skeleton width="full" />
    ) : (
      <MapView
        scaleBarEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        ref={mapRef}
        style={{ flex: 1 }}
        onDidFinishLoadingMap={handleMapReady}
        styleURL={MapboxGL.StyleURL.Street}>
        <Camera ref={cameraRef} animationMode="none" animationDuration={0} />
        {renderLocations()}
        {renderUserLocation()}
        {renderSelectedRestaurant()}
      </MapView>
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
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          return true;
        } else {
          console.log("Location permission denied");
          return false;
        }
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

  const handleRestaurantNamePress = (
    latitude: number,
    longitude: number,
    name: string
  ) => {
    setSelectedRestaurant({ latitude, longitude, name });
    cameraRef.current?.setCamera({
      centerCoordinate: [longitude, latitude],
      zoomLevel: 15,
      animationDuration: 1000,
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
            <MemoizedMealCard
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
