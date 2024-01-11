import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { Credential } from "schema";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      __typename
      credentials {
        __typename
        accessToken
        client
        expiry
        tokenType
        uid
      }
    }
  }
`;

interface Login {
  userLogin: {
    credentials: Credential;
  };
}

interface LoginInput {
  email: string;
  password: string;
}

type Options = MutationHookOptions<Login, LoginInput>;

const useLoginMutation = (options?: Options) =>
  useMutation<Login, LoginInput>(LOGIN, options);

export { useLoginMutation };
