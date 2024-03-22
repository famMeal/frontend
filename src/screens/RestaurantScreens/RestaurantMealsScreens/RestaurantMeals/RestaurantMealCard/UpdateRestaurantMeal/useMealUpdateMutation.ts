import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { CreatePayload, Meal, UpdateInput } from "schema";

const MEAL_UPDATE = gql`
  mutation MealUpdate($input: UpdateInput!) {
    mealUpdate(input: $input) {
      clientMutationId
      errors
      meal {
        __typename
        id
        name
        description
        price
      }
    }
  }
`;

type MealSplinter = Pick<
  Meal,
  "__typename" | "id" | "description" | "name" | "price"
>;

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

const useMealUpdateMutation = (options?: Options) =>
  useMutation(MEAL_UPDATE, options);

export { useMealUpdateMutation };
