import { LazyQueryHookOptions, gql, useLazyQuery } from "@apollo/client";
import type { Meal, Order, User } from "schema";

const RESTAURANT_ORDER_QUERY = gql`
  query RestaurantOrder($id: ID!) {
    order(id: $id) {
      __typename
      id
      quantity
      status
      subtotal
      total
      user {
        __typename
        id
        lastName
        firstName
      }
      meal {
        __typename
        active
        id
        name
        pickupStartTime
        pickupEndTime
        price
      }
    }
  }
`;

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
>;

interface OrderData extends OrderSplinter {
  user: UserSplinter;
  meal: MealSplinter;
}

interface Data {
  order: OrderData;
}

interface Variables {
  id: string;
}

type Options = LazyQueryHookOptions<Data, Variables>;

const useLazyRestaurantOrderQuery = (options?: Options) =>
  useLazyQuery(RESTAURANT_ORDER_QUERY, options);

export { useLazyRestaurantOrderQuery };
