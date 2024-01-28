import type { MutationHookOptions } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import type { UpdateSettingInput, UpdateSettingPayload } from "schema";

const UPDATE_RESTAURANT_SETTINGS = gql`
  mutation UpdateRestaurantSetting($input: UpdateSettingInput!) {
    updateRestaurantSetting(input: $input) {
      __typename
      clientMutationId
      errors
      restaurantSetting {
        __typename
        id
        orderCutoffTime
        orderStartTime
        pickupEndTime
        pickupStartTime
        quantityAvailable
      }
    }
  }
`;

interface Data {
  updateRestaurantSetting: UpdateSettingPayload;
}

type Variables = {
  input: UpdateSettingInput;
};

type Options = MutationHookOptions<Data, Variables>;

const useUpdateRestaurantSetting = (options?: Options) =>
  useMutation(UPDATE_RESTAURANT_SETTINGS, options);

export { useUpdateRestaurantSetting };
