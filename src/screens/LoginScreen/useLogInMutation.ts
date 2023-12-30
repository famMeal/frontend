import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { User } from "schema";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      __typename
      authenticatable {
        email
        firstName
        lastName
      }
      credentials {
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
    authenticatable: User;
    credentials: {
      accessToken: string;
      client: string;
      expiry: string;
      tokenType: string;
      uid: string;
    };
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
