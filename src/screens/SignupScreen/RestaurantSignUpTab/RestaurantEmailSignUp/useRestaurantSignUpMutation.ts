import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { MutationSignUpArgs } from "schema";

const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $firstName: String!
    $lastName: String!
    $restaurantName: String
    $addressLine1: String
    $addressLine2: String
    $certificateNumber: String
    $city: String
    $latitude: String
    $longitude: String
    $postalCode: String
    $province: String
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
      restaurantName: $restaurantName
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      certificateNumber: $certificateNumber
      city: $city
      latitude: $latitude
      longitude: $longitude
      postalCode: $postalCode
      province: $province
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

type Variables = Omit<
  MutationSignUpArgs,
  "confirmUrl" | "certificateNumber" | "addressLine2"
>;

type Options = MutationHookOptions<SignUp, Variables>;

const useRestaurantSignUpMutation = (options?: Options) =>
  useMutation<SignUp, Variables>(SIGN_UP, options);

export { useRestaurantSignUpMutation };
