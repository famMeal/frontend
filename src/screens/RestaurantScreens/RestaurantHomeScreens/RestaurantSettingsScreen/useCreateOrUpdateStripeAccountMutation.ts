import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";

const CREATE_OR_UPDATE_STRIPE_ACCOUNT = gql`
  mutation CreateOrUpdateStripeAccount {
    createOrUpdateStripeAccount(input: {}) {
      __typename
      redirectLink
      errorMessage
    }
  }
`;

interface Data {
  createOrUpdateStripeAccount: {
    redirectLink: String;
    errorMessage: String;
  };
}

type Options = MutationHookOptions<Data>;

const useCreateOrUpdateStripeAccount = (options?: Options) =>
  useMutation(CREATE_OR_UPDATE_STRIPE_ACCOUNT, options);

export { useCreateOrUpdateStripeAccount };
