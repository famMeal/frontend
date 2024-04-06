import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type {
  Order,
  UpdateAllOrdersStatusInput,
  UpdateOrderPayload,
} from "schema";

const UPDATE_ALL_ORDER_STATUS = gql`
  mutation UpdateAllOrdersStatus($input: UpdateAllOrdersStatusInput!) {
    updateAllOrdersStatus(input: $input) {
      __typename
      orders {
        __typename
        id
        status
      }
    }
  }
`;

type OrderSplinter = Pick<Order, "__typename" | "id" | "status">;

interface UpdateOrder extends Omit<UpdateOrderPayload, "order"> {
  orders: OrderSplinter[];
}

interface Data {
  updateOrder: UpdateOrder;
}

interface Variables {
  input: Pick<
    UpdateAllOrdersStatusInput,
    "fromStatus" | "restaurantId" | "toStatus"
  >;
}

type Options = MutationHookOptions<Data, Variables>;

const useUpdateAllOrderStatus = (options?: Options) =>
  useMutation<Data, Variables>(UPDATE_ALL_ORDER_STATUS, options);

export { useUpdateAllOrderStatus };
