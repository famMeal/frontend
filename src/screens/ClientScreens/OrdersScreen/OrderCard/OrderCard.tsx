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
import type { ChipTypes } from "components/Chip/Chip";
import { STATUS } from "constants/status";
import React, { type FC } from "react";
import { Linking } from "react-native";
import { formatTime } from "utilities/formatTime";
import { type UserOrderQueryData } from "../useGetUserOrdersQuery";
import { OrderCardSliderButton } from "./OrderCardSliderButton";

interface Props {
  order: UserOrderQueryData["user"]["orders"][number];
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

  const STATUS_CHIP_MAP = {
    [STATUS.COMPLETED]: "success",
    [STATUS.PICKED_UP]: "success",
    [STATUS.PREPARING]: "primary",
    [STATUS.READY]: "primary",
  };

  const chipStatus =
    STATUS_CHIP_MAP[status as keyof typeof STATUS_CHIP_MAP] || "error";

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
      { enableHighAccuracy: true }
    );
  };

  const renderButton = () =>
    status === STATUS.COMPLETED ? null : (
      <OrderCardSliderButton status={status} orderId={id} />
    );

  return (
    <Box key={id}>
      <Accordion>
        <Chip type={chipStatus as ChipTypes}>{status}</Chip>
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
          {renderButton()}
        </AccordionContent>
      </Accordion>
    </Box>
  );
};

export { OrderCard };
