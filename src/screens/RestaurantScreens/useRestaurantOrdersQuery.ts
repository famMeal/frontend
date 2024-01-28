import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Order, Restaurant, User } from "schema";

export const RESTAURANT_ORDERS_QUERY = gql`
  query ActiveOrders($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      meals {
        active
        __typename
        id
        name
        description
        price
        quantityAvailable
      }
      orders {
        __typename
        id
        quantity
        status
        subtotal
        total
        meal {
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

export type RestaurantMealData = Pick<
  Meal,
  | "id"
  | "name"
  | "active"
  | "price"
  | "description"
  | "__typename"
  | "quantityAvailable"
>;

type UserSplinter = Pick<User, "__typename" | "id" | "firstName" | "lastName">;

export interface OrderData extends OrderSplinter {
  meal: OrderMealSplinter;
  user: UserSplinter;
}

type RestaurantSplinter = Pick<Restaurant, "id" | "__typename" | "name">;

interface RestaurantData extends RestaurantSplinter {
  meals: RestaurantMealData[];
  orders: OrderData[];
}

export interface Data {
  restaurant: RestaurantData;
}

export interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantOrdersQuery = (options?: Options) =>
  useQuery(RESTAURANT_ORDERS_QUERY, options);

export { useRestaurantOrdersQuery };
export type {
  Data as RestaurantOrdersData,
  Variables as RestaurantOrdersVariables,
};
