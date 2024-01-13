import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { CreatePayload, Meal, UpdateInput } from "schema";

const MEAL_ACTIVATE = gql`
  mutation MealActivate($input: UpdateInput!) {
    mealUpdate(input: $input) {
      clientMutationId
      errors
      __typename
      meal {
        __typename
        id
        active
      }
    }
  }
`;

type MealSplinter = Pick<Meal, "__typename" | "id" | "active">;

type MealUpdateSplinter = Pick<
  CreatePayload,
  "__typename" | "clientMutationId" | "errors"
>;

interface MealUpdate extends MealUpdateSplinter {
  meal: MealSplinter;
}

interface Data {
  mealUpdate: MealUpdate;
}

type Variables = {
  input: UpdateInput;
};

type Options = MutationHookOptions<Data, Variables>;

const useActivateMealMutation = (options?: Options) =>
  useMutation(MEAL_ACTIVATE, options);

export { useActivateMealMutation };
