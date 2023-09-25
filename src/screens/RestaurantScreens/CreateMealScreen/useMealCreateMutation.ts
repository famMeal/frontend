import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { CreateInput, CreatePayload, Meal } from "schema";

const MEAL_CREATE = gql`
  mutation MealCreate($input: CreateInput!) {
    mealCreate(input: $input) {
      clientMutationId
      errors
      meal {
        __typename
        id
        name
        description
        price
        active
      }
    }
  }
`;

type MealSplinter = Pick<
  Meal,
  "__typename" | "id" | "description" | "name" | "price" | "active"
>;

type MealCreateSplinter = Pick<
  CreatePayload,
  "__typename" | "clientMutationId" | "errors"
>;

interface MealCreate extends MealCreateSplinter {
  meal: MealSplinter;
}

interface Data {
  mealCreate: MealCreate;
}

type Variables = {
  input: CreateInput;
};

type Options = MutationHookOptions<Data, Variables>;

const useMealCreateMutation = (options?: Options) =>
  useMutation(MEAL_CREATE, options);

export { useMealCreateMutation };
