import MapboxGL from "@rnmapbox/maps";
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

interface MapboxMapProps {
  destination?: {
    latitude: number;
    longitude: number;
  };
  restaurantName?: string;
  coordinates?: Array<{
    latitude: number;
    longitude: number;
    id: string;
  }>;
  onMapReady?: () => void;
}

MapboxGL.setAccessToken(process.env.MAPBOX_DOWNLOADS_TOKEN!);

const MapboxMap = memo(
  forwardRef<MapboxGL.MapView, MapboxMapProps>(
    ({ destination, restaurantName, coordinates, onMapReady }, ref) => {
      const [hasPermission, setHasPermission] = useState(false);
      const mapViewRef = useRef<MapboxGL.MapView>(null);
      const cameraRef = useRef<MapboxGL.Camera>(null);
      useImperativeHandle(ref, () => mapViewRef.current as any);

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
          cameraRef.current?.flyTo(
            [destination.longitude, destination.latitude],
            1000
          );
        }
      }, [coords, destination]);

      const renderMarker = useCallback(
        (
          markerProps: { latitude: number; longitude: number; id: string },
          index: number
        ) => (
          <MapboxGL.PointAnnotation
            key={markerProps.id}
            id={`marker-${index}`}
            coordinate={[markerProps.longitude, markerProps.latitude]}>
            <GoogleMarker />
          </MapboxGL.PointAnnotation>
        ),
        []
      );

      return (
        <MapboxGL.MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          onDidFinishLoadingMap={onMapReady}>
          {coords && (
            <MapboxGL.Camera
              ref={cameraRef}
              centerCoordinate={[
                coords.coords.longitude,
                coords.coords.latitude,
              ]}
              zoomLevel={14}
            />
          )}
          {coords && (
            <MapboxGL.PointAnnotation
              key="user-location"
              id="user-location"
              coordinate={[coords.coords.longitude, coords.coords.latitude]}>
              <GoogleMarker
                theme="primary"
                icon={<UserIcon color={COLOURS.white} />}
              />
            </MapboxGL.PointAnnotation>
          )}
          {destination && (
            <MapboxGL.PointAnnotation
              key="destination"
              id="destination"
              coordinate={[destination.longitude, destination.latitude]}>
              <GoogleMarker />
            </MapboxGL.PointAnnotation>
          )}
          {coordinates?.map(renderMarker)}
        </MapboxGL.MapView>
      );
    }
  )
);

export { MapboxMap };
