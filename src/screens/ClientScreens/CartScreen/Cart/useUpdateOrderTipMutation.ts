import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { Meal, Order, Restaurant, UpdateOrderInput } from "schema";

const UPDATE_ORDER_TIP = gql`
  mutation UpdateOrder($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
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
        tipAmount
        tipPercentage
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
    | "tipAmount"
    | "tipPercentage"
  > {
  meal?: MealSplinter;
  restaurant?: RestaurantSplinter;
}

interface Data {
  updateOrder?: {
    order?: OrderSplinter;
  };
}

interface Variables {
  input: Pick<UpdateOrderInput, "tipPercentage" | "orderId">;
}

type Options = MutationHookOptions<Data, Variables>;

const useUpdateOrderTipMutation = (options?: Options) =>
  useMutation<Data, Variables>(UPDATE_ORDER_TIP, options);

export { useUpdateOrderTipMutation };
