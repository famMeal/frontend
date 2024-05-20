import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { CreateOrUpdateStripeAccountPayload } from "schema";

const CREATE_OR_UPDATE_STRIPE_ACCOUNT_MUTATION = gql`
  mutation CreateOrUpdateStripeAccount {
    createOrUpdateStripeAccount(input: {}) {
      __typename
      redirectLink
      errorMessage
    }
  }
`;

interface Data {
  createOrUpdateStripeAccount: Pick<
    CreateOrUpdateStripeAccountPayload,
    "__typename" | "errorMessage" | "redirectLink"
  >;
}

type Options = MutationHookOptions<Data>;

const useCreateOrUpdateStripeAccountMutation = (options?: Options) =>
  useMutation<Data, {}>(CREATE_OR_UPDATE_STRIPE_ACCOUNT_MUTATION, options);

export { useCreateOrUpdateStripeAccountMutation };
