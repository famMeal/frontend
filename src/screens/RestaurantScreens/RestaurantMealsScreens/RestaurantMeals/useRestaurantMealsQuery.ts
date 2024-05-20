import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Restaurant } from "schema";

export const RESTAURANT_MEALS_QUERY = gql`
  query RestaurantMeals($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      stripeOnboardingComplete
      meals {
        active
        __typename
        id
        name
        description
        price
        quantityAvailable
      }
    }
  }
`;

type RestaurantMealData = Pick<
  Meal,
  | "id"
  | "name"
  | "active"
  | "price"
  | "description"
  | "__typename"
  | "quantityAvailable"
>;

type RestaurantSplinter = Pick<
  Restaurant,
  "id" | "__typename" | "name" | "stripeOnboardingComplete"
>;

interface RestaurantData extends RestaurantSplinter {
  meals: RestaurantMealData[];
}

export interface Data {
  restaurant: RestaurantData;
}

export interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantMealsQuery = (options?: Options) =>
  useQuery<Data, Variables>(RESTAURANT_MEALS_QUERY, options);

export { useRestaurantMealsQuery };
export type {
  Data as RestaurantMealsQueryData,
  Variables as RestaurantMealsQueryVariables,
};
