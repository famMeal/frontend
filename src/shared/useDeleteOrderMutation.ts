import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { Meal, MutationDeleteOrderArgs, Order, Restaurant } from "schema";

const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrder($input: DeleteOrderInput!) {
    deleteOrder(input: $input) {
      order {
        __typename
        createdAt
        id
        quantity
        total
        status
        subtotal
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
  > {
  meal?: MealSplinter;
  restaurant?: RestaurantSplinter;
}

interface Data {
  deleteOrder?: {
    order?: OrderSplinter;
  };
}

type Variables = MutationDeleteOrderArgs;

type Options = MutationHookOptions<Data, Variables>;

const useDeleteOrderMutation = (options?: Options) =>
  useMutation<Data, Variables>(DELETE_ORDER_MUTATION, options);

export { useDeleteOrderMutation };
