import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Restaurant } from "schema";

const GET_MEALS_QUERY = gql`
  query GetMealsQuery {
    meals {
      __typename
      active
      description
      id
      name
      orderStartTime
      orderCutoffTime
      pickupEndTime
      pickupStartTime
      price
      quantityAvailable
      restaurant {
        __typename
        name
        city
        addressLine1
        addressLine2
        id
        postalCode
      }
    }
  }
`;

type MealSplinter = Pick<
  Meal,
  | "__typename"
  | "active"
  | "description"
  | "id"
  | "name"
  | "orderCutoffTime"
  | "orderStartTime"
  | "pickupEndTime"
  | "pickupStartTime"
  | "price"
  | "quantityAvailable"
>;

type RestaurantSplinter = Pick<
  Restaurant,
  | "__typename"
  | "name"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "id"
  | "postalCode"
>;

export interface MealsData extends MealSplinter {
  restaurant: RestaurantSplinter;
}

interface Data {
  meals: MealsData[];
}

type Options = QueryHookOptions<Data>;

const useGetMealsQuery = (options?: Options) =>
  useQuery<Data>(GET_MEALS_QUERY, options);

export { useGetMealsQuery };
