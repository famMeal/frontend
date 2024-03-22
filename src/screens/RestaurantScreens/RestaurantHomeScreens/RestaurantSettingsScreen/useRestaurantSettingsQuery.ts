import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Restaurant, RestaurantSetting } from "schema";

const RESTAURANT_SETTINGS_QUERY = gql`
  query RestaurantSettings($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      addressLine1
      addressLine2
      city
      postalCode
      province
      restaurantSetting {
        __typename
        id
        orderCutoffTime
        orderStartTime
        pickupEndTime
        pickupStartTime
      }
    }
  }
`;

type RestaurantSettingSplinter = Pick<
  RestaurantSetting,
  | "__typename"
  | "id"
  | "orderCutoffTime"
  | "orderStartTime"
  | "pickupEndTime"
  | "pickupStartTime"
>;

interface RestaurantSplinter
  extends Pick<
    Restaurant,
    | "id"
    | "__typename"
    | "name"
    | "addressLine1"
    | "addressLine2"
    | "city"
    | "postalCode"
    | "province"
  > {
  restaurantSetting?: RestaurantSettingSplinter;
}

interface Data {
  restaurant: RestaurantSplinter;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantSettingsQuery = (options?: Options) =>
  useQuery<Data, Variables>(RESTAURANT_SETTINGS_QUERY, options);

export { useRestaurantSettingsQuery };
