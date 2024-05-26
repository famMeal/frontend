import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Order, OrdersFilterObject, Restaurant } from "schema";

export const RESTAURANT_QUERY = gql`
  query Restaurant($id: ID!, $filters: OrdersFilterObject) {
    restaurant(id: $id) {
      id
      __typename
      name
      stripeOnboardingComplete
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
      orders(filters: $filters) {
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
export interface OrderSplinter
  extends Pick<Order, "__typename" | "id" | "status" | "quantity"> {
  meal: OrderMealSplinter;
}

interface RestaurantSplinter
  extends Pick<
    Restaurant,
    "id" | "__typename" | "name" | "stripeOnboardingComplete"
  > {
  orders: OrderSplinter[];
  meals: MealSplinter[];
}

interface Data {
  restaurant: RestaurantSplinter;
}

export interface Variables {
  id: string;
  filters?: OrdersFilterObject;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantQuery = (options?: Options) =>
  useQuery<Data, Variables>(RESTAURANT_QUERY, options);

export { useRestaurantQuery };
export type {
  Data as RestaurantQueryData,
  Variables as RestaurantQueryVariables
};

