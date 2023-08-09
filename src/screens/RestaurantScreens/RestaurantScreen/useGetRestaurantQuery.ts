import { QueryHookOptions, gql, useQuery } from "@apollo/client";
import { Meal, Order, Restaurant } from "schema";

const GET_RESTAURANT_QUERY = gql`
  query GetRestaurantQuery($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      orders {
        __typename
        id
        quantity
        total
        meal {
          id
          __typename
          name
        }
      }
    }
  }
`;

type MealSplinter = Pick<Meal, "__typename" | "id" | "name">;

type OrderSplinter = Pick<Order, "__typename" | "id" | "quantity" | "total">;

type RestaurantSplinter = Pick<Restaurant, "id" | "__typename" | "name">;

interface OrderData extends OrderSplinter {
  meal: MealSplinter;
}

interface RestaurantData extends RestaurantSplinter {
  orders: OrderData;
}

interface Data {
  restaurant: RestaurantData;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useGetRestaurantQuery = (options?: Options) =>
  useQuery(GET_RESTAURANT_QUERY, options);

export { useGetRestaurantQuery };
