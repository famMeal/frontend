import { COLOURS } from "constants/colours";
import { useUserLocation } from "hooks";
import type { FC, ForwardedRef } from "react";
import { forwardRef, useEffect } from "react";
import { Dimensions } from "react-native";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import type { LatLng, MapMarkerProps } from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface Props {
  destination?: LatLng;
  restaurantName?: string;
  coordinates?: MapMarkerProps[];
  ref: ForwardedRef<MapView | null>;
}

const GoogleMap: FC<Props> = forwardRef<MapView, Props>(
  ({ destination, restaurantName, coordinates }, ref) => {
    const { coords } = useUserLocation();

    useEffect(() => {
      if (typeof ref !== "function") {
        if (coords && ref?.current && destination) {
          const coordinates: LatLng[] = [
            {
              latitude: coords?.coords?.latitude,
              longitude: coords?.coords?.longitude,
            },
            {
              latitude: destination.latitude,
              longitude: destination.longitude,
            },
          ];
          ref.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
            animated: true,
          });
        }
      }
    }, [destination, coords]);

    const calculateDeltas = () => {
      const desiredDistanceInKm = 10; // Adjust as needed
      const latDelta = desiredDistanceInKm / 111.32;
      const lonDelta =
        latDelta *
        (Dimensions.get("window").width / Dimensions.get("window").height);
      return { latitudeDelta: latDelta, longitudeDelta: lonDelta };
    };

    const getInitialRegion = () => {
      if (coords) {
        return {
          latitude: coords?.coords?.latitude,
          longitude: coords?.coords?.longitude,
          ...calculateDeltas(),
        };
      }
      return undefined;
    };

    const renderDirections = () => {
      if (destination && coords) {
        return (
          <>
            <Marker coordinate={coords?.coords} title="Your Location" />
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title={restaurantName}
            />
            <MapViewDirections
              origin={{
                latitude: coords?.coords?.latitude,
                longitude: coords?.coords?.longitude,
              }}
              destination={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor={COLOURS.accent}
            />
          </>
        );
      }
      return null;
    };

    const renderMarkers = () => {
      if (coordinates) {
        return coordinates?.map((props, index) => (
          <Marker key={index} {...props} />
        ));
      }
      return null;
    };

    return (
      <MapView className="flex-1" initialRegion={getInitialRegion()} ref={ref}>
        {renderDirections()}
        {renderMarkers()}
      </MapView>
    );
  },
);

export { GoogleMap };
