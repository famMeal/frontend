import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Chip,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import type { FC } from "react";
import { Linking } from "react-native";
import Toast from "react-native-toast-message";
import { useCurrentUserQuery } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { formatTime } from "utilities/formatTime";
import { SkeletonRestaurantSettingsScreens } from "./SkeletonRestaurantSettingsScreen";
import { useCreateOrUpdateStripeAccount } from "./useCreateOrUpdateStripeAccountMutation";
import { useRestaurantSettingsQuery } from "./useRestaurantSettingsQuery";

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantSettingsScreen"
>;

interface Props extends RestaurantStackProps {}

const RestaurantSettingsScreen: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  const [createStripeAccount, { loading }] = useCreateOrUpdateStripeAccount();

  const { data, loading: restaurantLoading } = useRestaurantSettingsQuery({
    skip: !restaurantID,
    variables: {
      id: restaurantID,
    },
  });
  const { data: userData, loading: userLoading } = useCurrentUserQuery();

  const onPressSetupPayment = () =>
    createStripeAccount({
      onCompleted: data => {
        const { createOrUpdateStripeAccount } = data ?? {};
        if (createOrUpdateStripeAccount?.redirectLink) {
          Linking.openURL(createOrUpdateStripeAccount?.redirectLink);
        }
        if (createOrUpdateStripeAccount?.errorMessage) {
          Toast.show({
            type: "error",
            text1: createOrUpdateStripeAccount?.errorMessage,
          });
        }
      },
    });

  if (userLoading || restaurantLoading) {
    return <SkeletonRestaurantSettingsScreens />;
  }

  const renderSecondAddress = () =>
    data?.restaurant?.addressLine2 ? (
      <Typography isMarginless type="S">
        {data?.restaurant?.addressLine2}
      </Typography>
    ) : null;

  const renderPaymentBox = () =>
    userData?.currentUser?.isStoreOwner ? (
      <Box>
        <Typography weigth="bold">Payment Providers</Typography>
        <Columns isMarginless>
          <Column>
            <Typography>Stripe</Typography>
          </Column>
          <Column>
            <Chip
              isStatic
              type={
                data?.restaurant?.stripeOnboardingComplete ? "success" : "error"
              }>
              {data?.restaurant?.stripeOnboardingComplete
                ? "Completed"
                : "Needs Attention"}
            </Chip>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Button
            isLoading={loading}
            className="mt-4"
            theme="primary"
            isClean
            onPress={onPressSetupPayment}>
            {data?.restaurant.hasStripeAccount
              ? "Update payments account"
              : "Setup payments account"}
          </Button>
        </Columns>
      </Box>
    ) : null;

  return (
    <Container>
      <Box>
        <Columns isMarginless>
          <Column>
            <Typography weigth="bold">{data?.restaurant?.name}</Typography>
            <Typography isMarginless type="S">
              {data?.restaurant?.addressLine1}
            </Typography>
            {renderSecondAddress()}
            <Typography isMarginless type="S">
              {data?.restaurant?.postalCode} {data?.restaurant?.city}{" "}
              {data?.restaurant?.province}
            </Typography>
          </Column>
        </Columns>
      </Box>
      <Box>
        <Typography weigth="bold">Pickup settings</Typography>
        <Columns isMarginless>
          <Column>
            <Typography isMarginless weigth="semiBold" type="S">
              Start order time:
            </Typography>
          </Column>
          <Column>
            <Typography isMarginless type="S">
              {formatTime(data?.restaurant?.restaurantSetting?.orderStartTime)}
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Typography isMarginless weigth="semiBold" type="S">
              End order time:
            </Typography>
          </Column>
          <Column>
            <Typography isMarginless type="S">
              {formatTime(data?.restaurant?.restaurantSetting?.orderCutoffTime)}
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Typography isMarginless weigth="semiBold" type="S">
              Start Pickup time:
            </Typography>
          </Column>
          <Column>
            <Typography isMarginless type="S">
              {formatTime(data?.restaurant?.restaurantSetting?.pickupStartTime)}
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Typography isMarginless weigth="semiBold" type="S">
              End Pickup time:
            </Typography>
          </Column>
          <Column>
            <Typography isMarginless type="S">
              {formatTime(data?.restaurant?.restaurantSetting?.pickupEndTime)}
            </Typography>
          </Column>
        </Columns>
      </Box>
      {renderPaymentBox()}
    </Container>
  );
};

export { RestaurantSettingsScreen };
