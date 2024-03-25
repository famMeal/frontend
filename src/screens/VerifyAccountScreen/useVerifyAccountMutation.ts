import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";

const VERIFY_ACCOUNT = gql`
  mutation VerifyAccount($email: String!, $confirmationToken: String!) {
    verifyAccount(email: $email, confirmationToken: $confirmationToken) {
      __typename
    }
  }
`;

interface VerifyAccount {
  verifyAccount: {
    __typename: string;
  };
}

interface VerifyAccountInput {
  email: string;
  confirmationToken: string;
}

type Options = MutationHookOptions<VerifyAccount, VerifyAccountInput>;

const useVerifyAccountMutation = (options?: Options) =>
  useMutation<VerifyAccount, VerifyAccountInput>(VERIFY_ACCOUNT, options);

export { useVerifyAccountMutation };
