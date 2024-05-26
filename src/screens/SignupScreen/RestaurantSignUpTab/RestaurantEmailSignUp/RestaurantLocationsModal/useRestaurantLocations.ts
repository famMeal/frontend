import axios from "axios";
import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "react-native-dotenv";

export interface RestaurantLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface UseRestaurantLocationsResult {
  data: RestaurantLocation[] | null;
  loading: boolean;
  error: string | null;
}

const useRestaurantLocations = (
  restaurantName: string,
  city: string
): UseRestaurantLocationsResult => {
  const [data, setData] = useState<RestaurantLocation[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantLocations = async () => {
      setLoading(true);
      setError(null);

      const query = `${restaurantName}, ${city}`;
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${GOOGLE_API_KEY}`;

      try {
        const response = await axios.get(url);
        if (response.data.results.length > 0) {
          const locations = response.data.results.map((result: any) => {
            const location = result.geometry.location;
            return {
              id: result.place_id,
              name: result.name,
              address: result.formatted_address,
              lat: location.lat,
              lng: location.lng,
            };
          });
          setData(locations);
        } else {
          setError("No results found");
        }
        // eslint-disable-next-line no-catch-shadow
      } catch (error) {
        setError("Error fetching location");
      } finally {
        setLoading(false);
      }
    };

    if (restaurantName && city) {
      fetchRestaurantLocations();
    }
  }, [restaurantName, city]);

  return { data, loading, error };
};

export { useRestaurantLocations };
