import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $firstName: String!
    $lastName: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

type Options = MutationHookOptions<SignUp, SignUpInput>;

const useClientSignUpMutation = (options?: Options) =>
  useMutation<SignUp, SignUpInput>(SIGN_UP, options);

export { useClientSignUpMutation };
