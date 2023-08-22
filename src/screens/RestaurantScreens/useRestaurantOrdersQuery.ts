import { QueryHookOptions, gql, useQuery } from "@apollo/client";
import { Meal, Order, Restaurant, User } from "schema";

const RESTAURANT_ORDERS_QUERY = gql`
  query RestaurantOrders($id: ID!) {
    restaurant(id: $id) {
      id
      __typename
      name
      orders {
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

type MealSpinter = Pick<
  Meal,
  | "__typename"
  | "id"
  | "name"
  | "active"
  | "pickupStartTime"
  | "pickupEndTime"
  | "price"
>;

type UserSplinter = Pick<User, "__typename" | "id" | "firstName" | "lastName">;

export interface OrderData extends OrderSplinter {
  meal: MealSpinter;
  user: UserSplinter;
}

type RestaurantSplinter = Pick<Restaurant, "id" | "__typename" | "name">;

interface RestaurantData extends RestaurantSplinter {
  orders: OrderData[];
}

interface Data {
  restaurant: RestaurantData;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useRestaurantOrdersQuery = (options?: Options) =>
  useQuery(RESTAURANT_ORDERS_QUERY, options);

export { useRestaurantOrdersQuery };
