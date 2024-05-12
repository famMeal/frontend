import { Box, Chip, Column, Columns, Typography } from "components";
import { STATUS } from "constants/status";
import { type FC } from "react";
import { View } from "react-native";

import { ThumbSlideButton } from "components/ThumbSlideButton";
import Toast from "react-native-toast-message";
import { OrderStatusField } from "schema";
import { useUpdateOrderStatus } from "shared/useUpdateOrderStatusMutation";
import { formatTime } from "utilities/formatTime";
import type { OrderData } from "../RestaurantActiveOrdersTab/useRestaurantOrdersQuery";

interface Props {
  order: OrderData;
}

const RestaurantOrderCard: FC<Props> = ({
  order: {
    id,
    status,
    subtotal,
    quantity,
    meal,
    user,
    pickupEndTime,
    pickupStartTime,
  },
}) => {
  const { name } = meal ?? {};
  const { firstName, lastName } = user ?? {};
  const [updateStatus, { loading }] = useUpdateOrderStatus();

  const chipType = status === STATUS?.COMPLETED ? "success" : "warning";

  const chipStatus =
    status === STATUS.COMPLETED
      ? "Completed"
      : status === STATUS.PICKED_UP
      ? "Picked Up"
      : "In Progress";

  const toggleSwitch = () => {
    updateStatus({
      variables: {
        input: {
          orderId: id,
          status: OrderStatusField.Completed,
        },
      },
      onCompleted: () =>
        Toast.show({
          type: "accent",
          text1: "Order Completed!",
        }),
    });
  };

  return (
    <Box key={id}>
      <Columns>
        <Column>
          <View>
            <Chip type={chipType} isStatic>
              {chipStatus}
            </Chip>
          </View>
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
      <Columns>
        <Column columnWidth="fullWidth">
          <ThumbSlideButton
            inCompletedText="Slide to confirm pickup"
            completedText="Order Completed"
            isCompleted={status === STATUS.COMPLETED}
            onSlideComplete={toggleSwitch}
            loading={loading}
          />
        </Column>
      </Columns>
    </Box>
  );
};

export { RestaurantOrderCard };
