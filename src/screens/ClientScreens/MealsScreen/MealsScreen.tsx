import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Container, GoogleMap, Skeleton } from "components";
import type { FC } from "react";
import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import type MapView from "react-native-maps";
import type { RootStackParamList } from "types/navigation.types";
import { Meals } from "./Meals";
import { useGetMealsLocationQuery } from "./useGetMealsLocationQuery";

type Props = NativeStackScreenProps<RootStackParamList, "Meals">;

const MealsScreen: FC<Props> = ({ route: { params } }) => {
  const { userID } = params;
  const mapRef = useRef<MapView>(null);
  const [scrollViewRef, setScrollViewRef] = useState<ScrollView | null>(null);
  const { data, loading } = useGetMealsLocationQuery();
  const { meals } = data ?? {};

  const locations = meals
    ?.map(({ restaurant }) => {
      return {
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        name: restaurant.name,
        id: restaurant.meals.find(({ active }) => active)?.id,
      };
    })
    .filter(location => location.latitude && location.longitude && location.id);

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
    if (restaurantIndex !== undefined && restaurantIndex !== -1) {
      scrollViewRef?.scrollTo({
        y: restaurantIndex * 400,
        animated: true,
      });
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
    <>
      <View className="h-52">{renderMap()}</View>
      <Container>
        <ScrollView ref={setScrollViewRef} onContentSizeChange={handleMapReady}>
          <Meals userID={userID} />
        </ScrollView>
      </Container>
    </>
  );
};

export { MealsScreen };
