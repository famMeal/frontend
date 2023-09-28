import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Restaurant } from "schema";

const GET_MEAL = gql`
  query GetMeal($id: ID!) {
    meal(id: $id) {
      id
      __typename
      name
      active
      description
      price
      pickupEndTime
      pickupStartTime
      restaurant {
        id
        __typename
        latitude
        longitude
      }
    }
  }
`;

type RestaurantSplinter = Pick<
  Restaurant,
  "__typename" | "id" | "longitude" | "latitude"
>;

export interface MealSplinter
  extends Pick<
    Meal,
    | "id"
    | "__typename"
    | "name"
    | "active"
    | "description"
    | "price"
    | "orderCutoffTime"
    | "orderStartTime"
    | "pickupEndTime"
    | "pickupStartTime"
  > {
  restaurant: RestaurantSplinter;
}

interface Data extends MealSplinter {
  meal: MealSplinter;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useGetMealQuery = (options?: Options) => useQuery(GET_MEAL, options);

export { useGetMealQuery };
