import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Meal, Order, QueryOrderArgs, Restaurant } from "schema";

export const GET_ORDER_QUERY = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      __typename
      createdAt
      id
      quantity
      total
      status
      subtotal
      tipAmount
      tipPercentage
      taxes
      pickupEndTime
      pickupStartTime
      meal {
        __typename
        id
        name
        description
        pickupEndTime
        pickupStartTime
        price
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
`;

type RestaurantSplinter = Pick<
  Restaurant,
  | "__typename"
  | "id"
  | "name"
  | "addressLine1"
  | "postalCode"
  | "latitude"
  | "longitude"
  | "city"
>;

type MealSplinter = Pick<
  Meal,
  | "__typename"
  | "id"
  | "name"
  | "description"
  | "pickupEndTime"
  | "pickupStartTime"
  | "price"
>;

interface OrderSplinter
  extends Pick<
    Order,
    | "__typename"
    | "createdAt"
    | "id"
    | "quantity"
    | "status"
    | "total"
    | "subtotal"
    | "pickupEndTime"
    | "pickupStartTime"
    | "taxes"
    | "tipAmount"
    | "tipPercentage"
  > {
  meal?: MealSplinter;
  restaurant?: RestaurantSplinter;
}

interface Data {
  order?: OrderSplinter;
}

type Variables = Pick<QueryOrderArgs, "id">;

type Options = QueryHookOptions<Data, Variables>;

const useGetOrderQuery = (options?: Options) =>
  useQuery<Data, Variables>(GET_ORDER_QUERY, options);

export {
  useGetOrderQuery,
  type Data as GetOrderQueryData,
  type Variables as GetOrderQueryVariables
};

