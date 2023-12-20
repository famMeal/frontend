import Geolocation from "@react-native-community/geolocation";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Box,
  Button,
  Column,
  Columns,
  Typography,
} from "components";
import { type FC } from "react";
import { Linking } from "react-native";
import type { OrderData } from "screens/ClientScreens/OrdersScreen/useUserOrdersScreen";
import { formatTime } from "utilities/formatTime";
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

  const { latitude, longitude, addressLine1, postalCode, city } =
    restaurant ?? {};

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
        <AccordionHeader>
          <Columns isMarginless>
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
          <Button onPress={handleOpenGoogleMaps} isOutlined>
            Directions
          </Button>
        </AccordionContent>
      </Accordion>
    </Box>
  );
};

export { OrderCard };
