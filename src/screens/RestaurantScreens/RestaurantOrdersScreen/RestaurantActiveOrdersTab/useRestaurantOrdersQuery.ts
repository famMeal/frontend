import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Order, OrdersFilterObject, Restaurant, User } from "schema";

export const RESTAURANT_ORDERS_QUERY = gql`
  query RestaurantOrders($id: ID!, $filters: OrdersFilterObject) {
    restaurant(id: $id) {
      id
      __typename
      name
      orders(filters: $filters) {
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
      }
    }
  }
`;

type RestaurantSplinter = Pick<Restaurant, "__typename" | "id" | "name">;

type OrderSplinter = Pick<
  Order,
  "__typename" | "id" | "quantity" | "status" | "subtotal" | "total"
>;

type OrderMealSplinter = Pick<
  Meal,
  | "__typename"
  | "id"
  | "name"
  | "active"
  | "pickupStartTime"
  | "pickupEndTime"
  | "price"
  | "quantityAvailable"
>;

type UserSplinter = Pick<User, "__typename" | "id" | "firstName" | "lastName">;

export interface OrderData extends OrderSplinter {
  meal?: OrderMealSplinter;
  user?: UserSplinter;
}

interface RestaurantData extends RestaurantSplinter {
  orders: OrderData[];
}

export interface Data {
  restaurant: RestaurantData;
}

export interface Variables {
  id: string;
  filters?: OrdersFilterObject;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantOrdersQuery = (options?: Options) =>
  useQuery<Data, Variables>(RESTAURANT_ORDERS_QUERY, options);

export { useRestaurantOrdersQuery };
export type {
  Variables as RestaurantOrdersVariables,
  Data as RestaurantQueryOrdersData,
};
