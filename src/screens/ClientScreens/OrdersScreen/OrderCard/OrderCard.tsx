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
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { STATUS } from "constants/status";
import { ImageUpIcon } from "lucide-react-native";
import React, { type FC } from "react";
import { Linking } from "react-native";
import SlideButton from "rn-slide-button";
import { RESTAURANT_ORDERS_QUERY } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { useUpdateOrderStatus } from "shared/useUpdateOrderStatusMutation";
import { formatTime } from "utilities/formatTime";
import type { OrderData } from "../ActiveOrderTab/useGetUserOrdersQuery";

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

  const [updateStatus, { loading }] = useUpdateOrderStatus();

  const chipStatus = status === STATUS.PICKED_UP ? "success" : "primary";

  const handleOnSlideComplete = () => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: STATUS.PICKED_UP,
        },
      },
      refetchQueries: [RESTAURANT_ORDERS_QUERY],
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

  const renderSlider = () => {
    if (status === STATUS.PICKED_UP) {
      return null;
    }
    return (
      <SlideButton
        animation
        onReachedToEnd={handleOnSlideComplete}
        padding={0}
        title="Slide to pickup"
        containerStyle={{ backgroundColor: COLOURS.accent }}
        underlayStyle={{ backgroundColor: COLOURS.primary }}
        titleStyle={{ fontWeight: 700, fontFamily: "Khula-Bold" }}
        disabled={loading}
        icon={<ImageUpIcon />}
      />
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

          {renderSlider()}
        </AccordionContent>
      </Accordion>
    </Box>
  );
};

export { OrderCard };
