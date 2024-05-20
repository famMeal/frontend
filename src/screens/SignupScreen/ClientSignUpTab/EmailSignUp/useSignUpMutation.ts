import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      __typename
    }
  }
`;

interface SignUp {
  signUp: {
    __typename: string;
  };
}

interface SignUpInput {
  email: string;
  password: string;
  passwordConfirmation: string;
}

type Options = MutationHookOptions<SignUp, SignUpInput>;

const useSignUpMutation = (options?: Options) =>
  useMutation<SignUp, SignUpInput>(SIGN_UP, options);

export { useSignUpMutation };
