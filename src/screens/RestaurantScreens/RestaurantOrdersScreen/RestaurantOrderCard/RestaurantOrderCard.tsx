import { Box, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { STATUS } from "constants/status";
import { type FC } from "react";
import { Switch, View } from "react-native";
import type { OrderData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { useUpdateOrderStatus } from "shared/useUpdateOrderStatusMutation";
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
    meal: { pickupEndTime, pickupStartTime, name },
    user: { firstName, lastName },
  },
}) => {
  const [updateStatus] = useUpdateOrderStatus();

  const chipType = status === STATUS.PICKED_UP ? "primary" : "success";
  const chipStatus =
    status === STATUS.COMPLETED
      ? "Completed"
      : status === STATUS.PICKED_UP
      ? "Picked Up"
      : "In Progress";

  const switchValue = status === STATUS.COMPLETED ? true : false;

  const toggleSwitch = () => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: STATUS.COMPLETED,
        },
      },
    });
  };

  return (
    <Box key={id}>
      <Columns className="border-b border-accent pb-4">
        <Column>
          <View>
            <Chip type={chipType} isStatic>
              {chipStatus}
            </Chip>
          </View>
        </Column>
        <Column alignItems="flex-end" justifyContent="flex-end">
          <Switch
            trackColor={{ false: COLOURS.primary, true: COLOURS.accent }}
            thumbColor={COLOURS.light}
            ios_backgroundColor={COLOURS.light}
            onValueChange={toggleSwitch}
            value={switchValue}
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
