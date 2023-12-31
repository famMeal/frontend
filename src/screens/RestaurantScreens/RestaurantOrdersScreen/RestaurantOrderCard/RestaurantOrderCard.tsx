import { Box, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { Switch, View } from "react-native";
import type { OrderData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { formatTime } from "utilities/formatTime";

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
      <Columns className="border-b border-accent pb-4">
        <Column>
          <View>
            <Chip type={isEnabled ? "success" : "primary"} isStatic>
              {renderStatus(status)}
            </Chip>
          </View>
        </Column>
        <Column alignItems="flex-end" justifyContent="flex-end">
          <Switch
            trackColor={{ false: COLOURS.white, true: COLOURS.accent }}
            thumbColor={COLOURS.white}
            ios_backgroundColor={COLOURS.light}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <Typography
            isMarginless
            type="S"
            colour="accent"
            weigth="bold"
            className="mt-4">
            {quantity} x {name}
          </Typography>
          <Typography isMarginless type="S">
            {firstName} {lastName}
          </Typography>
          <Typography isMarginless type="S">
            Order ID <Typography weigth="bold"> #{id}</Typography>
          </Typography>
        </Column>
        <Column alignItems="flex-end">
          <Typography
            isMarginless
            type="S"
            colour="accent"
            weigth="bold"
            className="mt-4">
            {subtotal}
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography isMarginless type="S">
            Pick up between:
            <Typography weigth="bold" type="S">
              {" "}
              {formatTime(pickupStartTime)} and {formatTime(pickupEndTime)}
            </Typography>
          </Typography>
        </Column>
      </Columns>
    </Box>
  );
};

export { RestaurantOrderCard };

// <Columns>
// <Column columnWidth="fullWidth">

//   <Typography weigth="semiBold">Pick up between:</Typography>
//   <Typography>
//     {formatTime(pickupStartTime)} and {formatTime(pickupEndTime)}
//   </Typography>
// </Column>
// </Columns>
// <Columns>
// <Column columnWidth="fullWidth">
//   <Typography weigth="semiBold">
//     Quantity: <Typography>{quantity}</Typography>
//   </Typography>
// </Column>
// </Columns>
// <Columns>
// <Column isPaddingless>
//   <Typography weigth="semiBold">
//     Subtotal: <Typography>{subtotal}</Typography>
//   </Typography>
// </Column>
// </Columns>
// <Columns>
// <Column isPaddingless>
//   <Typography weigth="semiBold">Ordered By:</Typography>
//   <Typography>
//     {firstName} {lastName}
//   </Typography>
// </Column>
// <Column isPaddingless className="items-end">

// </Column>
// </Columns>
