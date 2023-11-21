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
import { type FC } from "react";
import { Linking } from "react-native";

import type { OrderData } from "screens/ClientScreens/OrdersScreen/useUserOrdersScreen";
import { formatTime } from "utilities";
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
  } = order;

  const { name, latitude, longitude, addressLine1, postalCode, city } =
    restaurant;

  const handleOpenGoogleMaps = () => {
    Geolocation.getCurrentPosition(
      position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${latitude},${longitude}&travelmode=driving`;

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
      <Chip position="topRight">#{id}</Chip>
      <Accordion>
        <AccordionHeader>
          <Columns>
            <Column className="pb-0">
              <Columns className="-ml-8">
                <Column flex="shrink" isPaddingless className="justify-center">
                  <Typography
                    isMarginless
                    weigth="semiBold"
                    className="truncate">
                    {quantity} {""}x {meal.name}
                  </Typography>
                  <Typography>{restaurant.name}</Typography>
                  <Typography type="S">
                    Pickup between
                    <Typography type="S" weigth="semiBold">
                      {" "}
                      {formatTime(pickupStartTime)} and{" "}
                    </Typography>
                    <Typography type="S" weigth="semiBold">
                      {formatTime(pickupEndTime)}
                    </Typography>
                  </Typography>
                </Column>
              </Columns>
            </Column>
          </Columns>
        </AccordionHeader>
        <AccordionContent>
          <Columns>
            <Column isPaddingless>
              <Typography>{name}</Typography>
              <Typography>{addressLine1}</Typography>
              <Typography>
                {postalCode}
                <Typography> {city}</Typography>
              </Typography>
            </Column>
          </Columns>
          <Columns>
            <Column isPaddingless className="justify-end">
              <Typography weigth="semiBold">
                Total:
                <Typography> {total}</Typography>
              </Typography>
            </Column>
            <Column isPaddingless>
              <Button onPress={handleOpenGoogleMaps} isOutlined>
                Directions
              </Button>
            </Column>
          </Columns>
        </AccordionContent>
      </Accordion>
    </Box>
  );
};

export { OrderCard };
