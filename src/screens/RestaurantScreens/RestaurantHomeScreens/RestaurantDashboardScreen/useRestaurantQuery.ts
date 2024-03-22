import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Order, Restaurant } from "schema";

export const RESTAURANT_QUERY = gql`
  query Restaurant($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      meals {
        __typename
        id
        quantityAvailable
        active
        name
        pickupStartTime
        pickupEndTime
        price
      }
      orders {
        id
        __typename
        status
        quantity
        meal {
          __typename
          id
          active
          name
          pickupStartTime
          pickupEndTime
          price
          quantityAvailable
        }
      }
    }
  }
`;

type MealSplinter = Pick<
  Meal,
  | "__typename"
  | "id"
  | "quantityAvailable"
  | "name"
  | "pickupEndTime"
  | "pickupStartTime"
  | "active"
  | "price"
>;

type OrderMealSplinter = Pick<
  Meal,
  | "__typename"
  | "id"
  | "quantityAvailable"
  | "active"
  | "name"
  | "pickupStartTime"
  | "pickupEndTime"
  | "price"
>;
interface OrderSplinter
  extends Pick<Order, "__typename" | "id" | "status" | "quantity"> {
  meal: OrderMealSplinter;
}

interface RestaurantSplinter
  extends Pick<Restaurant, "id" | "__typename" | "name"> {
  orders: OrderSplinter[];
  meals: MealSplinter[];
}

interface Data {
  restaurant: RestaurantSplinter;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantQuery = (options?: Options) =>
  useQuery<Data, Variables>(RESTAURANT_QUERY, options);

export { useRestaurantQuery };
export type {
  Data as RestaurantQueryData,
  Variables as RestaurantQueryVariables,
};
