import { Container, GoogleMap, Skeleton } from "components";
import type { FC } from "react";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import type MapView from "react-native-maps";
import { Meals } from "./Meals";
import { useGetMealsLocationQuery } from "./useGetMealsLocationQuery";

const MealsScreen: FC = () => {
  const mapRef = useRef<MapView>(null);
  const [scrollViewRef, setScrollViewRef] = useState<ScrollView | null>(null);
  const { data, loading } = useGetMealsLocationQuery();
  const { meals } = data ?? {};

  const locations = meals?.map(
    ({ restaurant: { latitude, longitude, name, meals } }) => {
      return {
        latitude,
        longitude,
        name,
        id: meals.find(({ active }) => active)?.id,
      };
    },
  );

  const handleMapReady = () => {
    const coordinates = locations?.map(({ latitude, longitude }) => {
      return { latitude: latitude!, longitude: longitude! };
    });

    mapRef.current?.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  const handleOnPressMarker = (restaurantId: string) => {
    const restaurantIndex = meals?.findIndex(({ id }) => id === restaurantId);
    if (scrollViewRef && restaurantIndex !== -1) {
      scrollViewRef.scrollTo({ y: restaurantIndex ?? 0 * 400, animated: true });
    }
  };

  const coordinates = locations?.map(({ latitude, longitude, name, id }) => {
    return {
      coordinate: {
        latitude: latitude!,
        longitude: longitude!,
      },
      title: name,
      onPress: () => handleOnPressMarker(id!),
    };
  });

  const renderMap = () => {
    if (loading) {
      return <Skeleton width="full" />;
    }
    return <GoogleMap ref={mapRef} coordinates={coordinates} />;
  };

  return (
    <Container className="m-4">
      <View className="h-52 mb-4">{renderMap()}</View>
      <ScrollView ref={setScrollViewRef} onContentSizeChange={handleMapReady}>
        <Meals />
      </ScrollView>
    </Container>
  );
};

export { MealsScreen };
