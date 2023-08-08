import type { QueryHookOptions } from "@apollo/client";
import type { Meal, Restaurant } from "schema";
import { gql, useQuery } from "@apollo/client";

const GET_RESTAURANT_MEAL_QUERY = gql`
  query GetRestaurantMealQuery($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      latitude
      longitude
      meals {
        id
        __typename
        name
        active
        description
        price
        pickupEndTime
        pickupStartTime
      }
    }
  }
`;

type RestaurantSplinter = Pick<
  Restaurant,
  "__typename" | "id" | "name" | "longitude" | "latitude"
>;

export type MealSplinter = Pick<
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
>;

interface RestaurantMeal extends RestaurantSplinter {
  meals: MealSplinter[];
}
interface Data {
  restaurant: RestaurantMeal;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useGetRestaurantMealQuery = (options?: Options) =>
  useQuery(GET_RESTAURANT_MEAL_QUERY, options);

export { useGetRestaurantMealQuery };
