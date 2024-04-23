import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type {
  Meal,
  Order,
  PlaceOrderInput,
  PlaceOrderPayload,
  Restaurant,
} from "schema";

const PLACE_ORDER = gql`
  mutation placeOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      __typename
      clientMutationId
      errors
      order {
        __typename
        id
        pickupStartTime
        pickupEndTime
        quantity
        subtotal
        taxes
        total
        meal {
          __typename
          description
          id
          name
          price
        }
        restaurant {
          __typename
          addressLine1
          addressLine2
          city
          country
          id
          latitude
          longitude
          postalCode
          name
        }
      }
    }
  }
`;

interface OrderSplinter
  extends Pick<
    Order,
    | "__typename"
    | "id"
    | "pickupStartTime"
    | "pickupEndTime"
    | "quantity"
    | "subtotal"
    | "taxes"
    | "total"
  > {
  meal: MealSplinter;
  restaurant: RestaurantSplinter;
}

type MealSplinter = Pick<
  Meal,
  "__typename" | "description" | "id" | "name" | "price"
>;

type RestaurantSplinter = Pick<
  Restaurant,
  | "__typename"
  | "addressLine1"
  | "addressLine2"
  | "city"
  | "country"
  | "id"
  | "latitude"
  | "longitude"
  | "postalCode"
  | "name"
>;

interface PlaceOrder extends Omit<PlaceOrderPayload, "order"> {
  order: OrderSplinter;
}

interface Data {
  placeOrder: PlaceOrder;
}

interface Variables {
  input: PlaceOrderInput;
}

type Options = MutationHookOptions<Data, Variables>;

const usePlaceOrderMutation = (options?: Options) =>
  useMutation<Data, Variables>(PLACE_ORDER, options);

export { usePlaceOrderMutation };
export type { Data as PlaceOrderMutationData };
