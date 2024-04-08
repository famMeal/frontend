import { GoogleMarker } from "components/GoogleMarker";
import { COLOURS } from "constants/colours";
import { useUserLocation } from "hooks";
import { UserIcon } from "lucide-react-native";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { GOOGLE_API_KEY } from "react-native-dotenv";
import type { MapMarkerProps, Region } from "react-native-maps";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface GoogleMapProps {
  destination?: Region;
  restaurantName?: string;
  coordinates?: MapMarkerProps[];
}

const GoogleMap = memo(
  forwardRef<MapView, GoogleMapProps>(
    ({ destination, restaurantName, coordinates }, ref) => {
      const [hasPermission, setHasPermission] = useState(false);
      const mapViewRef = useRef<MapView>(null);
      useImperativeHandle(ref, () => mapViewRef.current as MapView);

      const checkLocationPermission = useCallback(async () => {
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
            setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
          } catch (err) {
            console.warn(err);
          }
        } else {
          setHasPermission(true);
        }
      }, []);

      useEffect(() => {
        checkLocationPermission();
      }, [checkLocationPermission]);

      const { coords } = useUserLocation();

      useEffect(() => {
        if (coords && destination) {
          const coordinatesArray: Region[] = [
            {
              latitude: coords.coords.latitude,
              longitude: coords.coords.longitude,
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

      return (
        <MapView
          className="flex-1"
          initialRegion={
            coords
              ? {
                  latitude: coords.coords.latitude,
                  longitude: coords.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : undefined
          }
          ref={mapViewRef}
          showsUserLocation={hasPermission}
          followsUserLocation={hasPermission}>
          {coords && (
            <Marker coordinate={coords.coords} title="Your Location">
              <GoogleMarker
                theme="primary"
                icon={<UserIcon color={COLOURS.white} />}
              />
            </Marker>
          )}
          {destination && (
            <Marker coordinate={destination} title={restaurantName}>
              <GoogleMarker />
            </Marker>
          )}
          {destination && coords && (
            <MapViewDirections
              origin={coords.coords}
              destination={destination}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor={COLOURS.accent}
            />
          )}
          {coordinates?.map((markerProps, index) => (
            <Marker key={index} {...markerProps}>
              <GoogleMarker />
            </Marker>
          ))}
        </MapView>
      );
    }
  )
);

export { GoogleMap };
