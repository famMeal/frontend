import Geolocation from "@react-native-community/geolocation";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Box,
  Button,
  Chip,
  Column,
  Columns,
  SlideButton,
  Typography,
} from "components";
import { STATUS } from "constants/status";
import { type FC } from "react";
import { Linking } from "react-native";
import type { OrderData } from "screens/ClientScreens/OrdersScreen/useGetUserOrdersQuery";
import { formatTime } from "utilities/formatTime";
import { useUpdateOrderStatus } from "./useUpdateOrderStatusMutation";

interface Props {
  order: OrderData;
}

const OrderCard: FC<Props> = ({ order }) => {
  const {
    id,
    quantity,
    meal,
    restaurant,
    pickupEndTime,
    pickupStartTime,
    total,
    status,
  } = order;

  const { latitude, longitude, addressLine1, postalCode, city } =
    restaurant ?? {};

  const [updateStatus] = useUpdateOrderStatus();

  const chipStatus = status === STATUS.PICKED_UP ? "success" : "primary";

  const handleOnSlideComplete = () => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: STATUS.PICKED_UP,
        },
      },
    });
  };

  const handleOpenGoogleMaps = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude: userLat, longitude: userLong } =
          position.coords ?? {};

        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLong}&destination=${latitude},${longitude}&travelmode=driving`;

        Linking.openURL(url);
      },
      error => {
        console.error("Error getting user's location:", error);
      },
      { enableHighAccuracy: true },
    );
  };

  return (
    <Box key={id}>
      <Accordion>
        <Chip type={chipStatus}>{status}</Chip>
        <AccordionHeader>
          <Columns isMarginless className="mt-12">
            <Column columnWidth="fullWidth">
              <Typography
                type="S"
                isMarginless
                weigth="semiBold"
                className="truncate">
                {quantity} {""}x {meal.name}
              </Typography>
              <Typography isMarginless type="S">
                Order ID:{" "}
                <Typography isMarginless type="S">
                  #{id}
                </Typography>
              </Typography>
            </Column>
          </Columns>
          <Columns isMarginless>
            <Column>
              <Typography isMarginless type="S">
                Total:
              </Typography>
            </Column>
            <Column alignItems="flex-end">
              <Typography isMarginless type="S" weigth="semiBold">
                {total}
              </Typography>
            </Column>
          </Columns>
        </AccordionHeader>
        <AccordionContent>
          <Columns>
            <Column columnWidth="fullWidth">
              <Typography isMarginless type="S" weigth="semiBold">
                {restaurant.name}
              </Typography>
              <Typography isMarginless type="S">
                {addressLine1} {postalCode} {city}
              </Typography>
              <Typography isMarginless type="S">
                Pickup between:
                <Typography isMarginless type="S" weigth="semiBold">
                  {" "}
                  {formatTime(pickupStartTime)} and{" "}
                </Typography>
                <Typography isMarginless type="S" weigth="semiBold">
                  {formatTime(pickupEndTime)}
                </Typography>
              </Typography>
            </Column>
          </Columns>
          <Columns>
            <Column columnWidth="fullWidth">
              <Button onPress={handleOpenGoogleMaps} isOutlined>
                Directions
              </Button>
            </Column>
          </Columns>
          <Columns>
            <Column columnWidth="fullWidth">
              <SlideButton
                completed={status === STATUS.PICKED_UP}
                onSlideComplete={handleOnSlideComplete}
                onCompletedText="Picked up!">
                Slide to confirm pickup
              </SlideButton>
            </Column>
          </Columns>
        </AccordionContent>
      </Accordion>
    </Box>
  );
};

export { OrderCard };
