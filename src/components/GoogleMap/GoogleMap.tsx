import { GoogleMarker } from "components/GoogleMarker";
import { COLOURS } from "constants/colours";
import { useUserLocation } from "hooks";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { Dimensions } from "react-native";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import type { MapMarkerProps, Region } from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface GoogleMapProps {
  destination?: Region;
  restaurantName?: string;
  coordinates?: MapMarkerProps[];
}

const GoogleMap = forwardRef<MapView, GoogleMapProps>(
  ({ destination, restaurantName, coordinates }, ref) => {
    const { coords } = useUserLocation();
    const mapViewRef = useRef<MapView>(null);

    useImperativeHandle(ref, () => mapViewRef?.current as MapView);

    useEffect(() => {
      if (coords && destination) {
        const coordinatesArray: Region[] = [
          {
            latitude: coords?.coords?.latitude!,
            longitude: coords?.coords?.longitude!,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          destination,
        ];
        mapViewRef.current?.fitToCoordinates(coordinatesArray, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        });
      }
    }, [coords, destination]);

    const calculateDeltas = (): Region => {
      // Adjust the radius for a closer zoom
      const radiusKm = 1; // Reduced radius to 1 km for a closer view
      const oneDegreeOfLatitudeInKilometers = 111; // Approximate conversion factor
      const latitudeDelta = (radiusKm / oneDegreeOfLatitudeInKilometers) * 2;
      const longitudeDelta =
        latitudeDelta *
        (Dimensions.get("window").width / Dimensions.get("window").height);

      return {
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
        latitude: 0,
        longitude: 0,
      };
    };

    const getInitialRegion = (): Region | undefined => {
      if (coords) {
        const { latitudeDelta, longitudeDelta } = calculateDeltas();
        return {
          latitude: coords?.coords?.latitude,
          longitude: coords?.coords?.longitude,
          latitudeDelta,
          longitudeDelta,
        };
      }
      return undefined;
    };

    const renderDirections = () => {
      if (destination && coords) {
        return (
          <>
            <Marker coordinate={coords?.coords} title="Your Location" />
            <Marker coordinate={destination} title={restaurantName} />
            <MapViewDirections
              origin={coords?.coords}
              destination={destination}
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
      return coordinates?.map((markerProps, index) => (
        <Marker key={index} {...markerProps}>
          <GoogleMarker />
        </Marker>
      ));
    };

    return (
      <MapView
        className="flex-1"
        initialRegion={getInitialRegion()}
        ref={mapViewRef}>
        {renderDirections()}
        {renderMarkers()}
      </MapView>
    );
  }
);

export { GoogleMap };
