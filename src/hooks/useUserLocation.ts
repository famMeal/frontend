import type { GeolocationResponse } from "@react-native-community/geolocation";
import Geolocation from "@react-native-community/geolocation";
import { useEffect, useState } from "react";

const useUserLocation = () => {
  const [coords, setCoords] = useState<GeolocationResponse | null>(null);

  useEffect(() => {
    Geolocation.requestAuthorization();

    Geolocation.getCurrentPosition(
      position => {
        setCoords(position);
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return { coords };
};

export { useUserLocation };
