import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type {
  AddToCartInput,
  AddToCartPayload,
  Meal,
  Order,
  Restaurant,
} from "schema";

const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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

interface AddToCart extends Omit<AddToCartPayload, "order"> {
  order: OrderSplinter;
}

interface Data {
  addToCart: AddToCart;
}

interface Variables {
  input: AddToCartInput;
}

type Options = MutationHookOptions<Data, Variables>;

const useAddToCartMutation = (options?: Options) =>
  useMutation<Data, Variables>(ADD_TO_CART, options);

export { useAddToCartMutation };
export type { OrderSplinter as AddToCartData };
