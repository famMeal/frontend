import { Box, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { Switch } from "react-native";
import type { OrderData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { formatTime } from "utilities";

interface Props {
  order: OrderData;
}

const RestaurantOrderCard: FC<Props> = ({
  order: {
    id,
    status,
    subtotal,
    quantity,
    meal: { pickupEndTime, pickupStartTime, price: unusedPrice, name },
    user: { firstName, lastName },
  },
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const renderStatus = (status?: OrderData["status"]) =>
    isEnabled ? "Picked up" : status;

  return (
    <Box key={id}>
      <Chip type={isEnabled ? "success" : "primary"} position="topRight">
        {renderStatus(status)}
      </Chip>
      <Columns>
        <Column isPaddingless>
          <Typography colour="accent" weigth="bold" type="H3" className="mt-10">
            {name}
          </Typography>
          <Typography weigth="semiBold">Pick up between:</Typography>
          <Typography>
            {formatTime(pickupStartTime)} and {formatTime(pickupEndTime)}
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column isPaddingless>
          <Typography weigth="semiBold">
            Quantity: <Typography>{quantity}</Typography>
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column isPaddingless>
          <Typography weigth="semiBold">
            Subtotal: <Typography>{subtotal}</Typography>
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column isPaddingless>
          <Typography weigth="semiBold">Ordered By:</Typography>
          <Typography>
            {firstName} {lastName}
          </Typography>
        </Column>
        <Column isPaddingless className="items-end">
          <Typography weigth="semiBold">Picked up</Typography>
          <Switch
            trackColor={{ false: COLOURS.white, true: COLOURS.accent }}
            thumbColor={COLOURS.white}
            ios_backgroundColor={COLOURS.light}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Column>
      </Columns>
    </Box>
  );
};

export { RestaurantOrderCard };
