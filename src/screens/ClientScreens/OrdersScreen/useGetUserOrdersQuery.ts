import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Order, OrdersFilterObject, Restaurant, User } from "schema";

export const GET_USER_0RDERS_QUERY = gql`
  query GetUserOrdersQuery($id: ID!, $filters: OrdersFilterObject) {
    user(id: $id) {
      id
      __typename
      orders(filters: $filters) {
        __typename
        createdAt
        id
        pickupEndTime
        pickupStartTime
        quantity
        total
        status
        meal {
          __typename
          id
          name
        }
        restaurant {
          __typename
          id
          name
          addressLine1
          postalCode
          latitude
          longitude
          city
        }
      }
    }
  }
`;

type UserSplinter = Pick<User, "__typename" | "id">;

type OrderSplinter = Pick<
  Order,
  | "__typename"
  | "id"
  | "pickupEndTime"
  | "pickupStartTime"
  | "status"
  | "quantity"
  | "total"
  | "createdAt"
>;

export interface OrderData extends OrderSplinter {
  meal: Pick<Meal, "__typename" | "id" | "name">;
  restaurant: Pick<
    Restaurant,
    | "__typename"
    | "id"
    | "addressLine1"
    | "postalCode"
    | "latitude"
    | "longitude"
    | "name"
    | "city"
  >;
}

interface UserOrderData extends UserSplinter {
  orders: OrderData[];
}

interface Data {
  user: UserOrderData;
}

interface Variables {
  id: string;
  filters?: OrdersFilterObject;
}

type Options = QueryHookOptions<Data, Variables>;

const useGetUserOrdersQuery = (options?: Options) =>
  useQuery<Data, Variables>(GET_USER_0RDERS_QUERY, options);

export { useGetUserOrdersQuery, type Data as UserOrderQueryData };
