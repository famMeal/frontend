import type { QueryHookOptions } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import type { Restaurant, User } from "schema";

const GET_CURRENT_USER_QUERY = gql`
  query GetCurrentUser {
    currentUser {
      id
      __typename
      isStoreOwner
      restaurant {
        __typename
        id
      }
    }
  }
`;

type RestaurantSplinter = Pick<Restaurant, "__typename" | "id">;

interface UserSplinter extends Pick<User, "id" | "__typename"> {
  restaurant?: RestaurantSplinter;
}

interface Data {
  currentUser: UserSplinter;
}

type Options = QueryHookOptions<Data>;

const useCurrentUserQuery = (options?: Options) =>
  useQuery<Data>(GET_CURRENT_USER_QUERY, options);

export { useCurrentUserQuery };
