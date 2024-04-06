import type { LazyQueryHookOptions } from "@apollo/client";
import { gql, useLazyQuery } from "@apollo/client";
import type { Meal, Order, Restaurant, User } from "schema";

export const LAZY_RESTAURANT_ORDER_QUERY = gql`
  query LazyRestaurantOrder($id: ID!) {
    order(id: $id) {
      __typename
      id
      quantity
      status
      subtotal
      total
      meal {
        __typename
        active
        id
        name
        pickupStartTime
        pickupEndTime
        price
        quantityAvailable
      }
      user {
        __typename
        id
        lastName
        firstName
      }
      restaurant {
        __typename
        id
        name
      }
    }
  }
`;

type RestaurantSplinter = Pick<Restaurant, "__typename" | "id" | "name">;

type OrderSplinter = Pick<
  Order,
  "__typename" | "id" | "quantity" | "status" | "subtotal" | "total"
>;

type UserSplinter = Pick<User, "__typename" | "id" | "firstName" | "lastName">;

type MealSplinter = Pick<
  Meal,
  | "__typename"
  | "id"
  | "active"
  | "pickupStartTime"
  | "pickupEndTime"
  | "name"
  | "price"
  | "quantityAvailable"
>;

interface OrderData extends OrderSplinter {
  user?: UserSplinter;
  meal?: MealSplinter;
  restaurant?: RestaurantSplinter;
}

interface Data {
  order?: OrderData;
}

interface Variables {
  id: string;
}

type Options = LazyQueryHookOptions<Data, Variables>;

const useLazyRestaurantOrderQuery = (options?: Options) =>
  useLazyQuery<Data, Variables>(LAZY_RESTAURANT_ORDER_QUERY, options);

export { useLazyRestaurantOrderQuery };
export type { Data as RestaurantOrderData };
