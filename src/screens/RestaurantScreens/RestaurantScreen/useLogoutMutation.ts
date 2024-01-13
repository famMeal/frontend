import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { User } from "schema";

const LOGOUT = gql`
  mutation Logout {
    userLogout {
      authenticatable {
        __typename
        id
      }
    }
  }
`;

interface Logout {
  userLogout: {
    authenticatable: Pick<User, "__typename" | "id">;
  };
}

type Options = MutationHookOptions<Logout>;

const useLogoutMutation = (options?: Options) =>
  useMutation<Logout>(LOGOUT, options);

export { useLogoutMutation };
