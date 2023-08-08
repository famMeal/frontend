import type { QueryHookOptions } from "@apollo/client";
import type { User } from "schema";
import { gql, useQuery } from "@apollo/client";

const GET_USER_QUERY = gql`
  query GetUserQuery($id: ID!) {
    user(id: $id) {
      id
      __typename
      firstName
      lastName
      email
    }
  }
`;

type UserSplinter = Pick<
  User,
  "__typename" | "email" | "firstName" | "id" | "lastName"
>;

interface Data {
  user: UserSplinter;
}

interface Variables {
  id: string;
}

type Options = QueryHookOptions<Data, Variables>;

const useGetUserQuery = (options?: Options) =>
  useQuery(GET_USER_QUERY, options);

export { useGetUserQuery };
