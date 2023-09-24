import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Restaurant } from "schema";

const RESTAURANT_QUERY = gql`
  query Restaurant($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
    }
  }
`;

type RestaurantSplinter = Pick<Restaurant, "id" | "__typename" | "name">;

interface Data {
  restaurant: RestaurantSplinter;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantQuery = (options?: Options) =>
  useQuery(RESTAURANT_QUERY, options);

export { useRestaurantQuery };
