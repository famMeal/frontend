import { gql, useMutation, type MutationHookOptions } from "@apollo/client";
import type { DeleteInput, DeletePayload } from "schema";

const MEAL_DELETE = gql`
  mutation MealDelete($input: DeleteInput!) {
    mealDelete(input: $input) {
      clientMutationId
      errors
      meal {
        id
        price
        active
        name
        __typename
        description
        price
        pickupEndTime
        orderCutoffTime
        orderStartTime
        quantityAvailable
      }
    }
  }
`;

type Data = DeletePayload;

type Variables = {
  input: DeleteInput;
};

type Options = MutationHookOptions<Data, Variables>;

const useMealDeleteMutation = (options?: Options) =>
  useMutation(MEAL_DELETE, options);

export { useMealDeleteMutation };
