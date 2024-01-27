import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Columns, Container, Typography } from "components";
import type { FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { formatTime } from "utilities/formatTime";
import { useRestaurantSettingsQuery } from "./useRestaurantSettingsQuery";

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantSettingsScreen"
>;

interface Props extends RestaurantStackProps {}

const RestaurantSettingsScreen: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  const { data } = useRestaurantSettingsQuery({
    skip: !restaurantID,
    variables: {
      id: restaurantID,
    },
  });

  const renderSecondAddress = () =>
    data?.restaurant?.addressLine2 ? (
      <Typography isMarginless type="S">
        {data?.restaurant?.addressLine2}
      </Typography>
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
    </Container>
  );
};

export { RestaurantSettingsScreen };
