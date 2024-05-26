import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type {
  Meal,
  Order,
  User,
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
      paymentIntent
      ephemeralKey
      customerId
      setupIntent
      order {
        __typename
        id
        pickupStartTime
        pickupEndTime
        quantity
        subtotal
        taxes
        total
        user {
          firstName
          lastName
        }
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
          stripeAccountId
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
  user: UserSplinter;
}

type MealSplinter = Pick<
  Meal,
  "__typename" | "description" | "id" | "name" | "price"
>;

type UserSplinter = Pick<User, "__typename" | "firstName" | "lastName">;

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
  | "stripeAccountId"
>;

interface PlaceOrder extends Omit<PlaceOrderPayload, "order"> {
  order: OrderSplinter;
  paymentIntent: string;
  ephemeralKey: string;
  customerId: string;
  setupIntent: string;
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
