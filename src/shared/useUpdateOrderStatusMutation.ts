import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { Order, UpdateOrderInput, UpdateOrderPayload } from "schema";

const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($input: UpdateOrderInput!) {
    updateOrder(input: $input) {
      __typename
      clientMutationId
      errors
      order {
        __typename
        id
        status
      }
    }
  }
`;

type OrderSplinter = Pick<Order, "__typename" | "id" | "status">;

interface UpdateOrder extends Omit<UpdateOrderPayload, "order"> {
  order: OrderSplinter;
}

interface Data {
  updateOrder: UpdateOrder;
}

interface Variables {
  input: Pick<UpdateOrderInput, "orderId" | "status">;
}

type Options = MutationHookOptions<Data, Variables>;

const useUpdateOrderStatus = (options?: Options) =>
  useMutation<Data, Variables>(UPDATE_ORDER_STATUS, options);

export { useUpdateOrderStatus };
