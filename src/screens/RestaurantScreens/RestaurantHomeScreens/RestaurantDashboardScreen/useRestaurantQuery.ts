import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Order, Restaurant } from "schema";

const RESTAURANT_QUERY = gql`
  query Restaurant($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      orders {
        id
        __typename
        status
      }
    }
  }
`;

type OrderSplinter = Pick<Order, "__typename" | "id" | "status">;

interface RestaurantSplinter
  extends Pick<Restaurant, "id" | "__typename" | "name" | "orders"> {
  orders: OrderSplinter[];
}

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
