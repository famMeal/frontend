import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Restaurant } from "schema";

const GET_MEALS_LOCATION_QUERY = gql`
  query GetMealsLocationQuery {
    meals {
      __typename
      id
      restaurant {
        __typename
        name
        id
        longitude
        latitude
        meals {
          __typename
          active
          id
        }
      }
    }
  }
`;

type MealSplinter = Pick<Meal, "__typename" | "id">;
type RestaurantLocationSplinter = Pick<
  Restaurant,
  "__typename" | "longitude" | "latitude" | "id" | "name"
>;

type RestaurantMealsSplinter = Pick<Meal, "active" | "id" | "__typename">;

interface RestaurantData extends RestaurantLocationSplinter {
  meals: RestaurantMealsSplinter[];
}

export interface Meals extends MealSplinter {
  restaurant: RestaurantData;
}

interface Data {
  meals: Meals[];
}

type Options = QueryHookOptions<Data>;

const useGetMealsLocationQuery = (options?: Options) =>
  useQuery<Data>(GET_MEALS_LOCATION_QUERY, options);

export { useGetMealsLocationQuery };
