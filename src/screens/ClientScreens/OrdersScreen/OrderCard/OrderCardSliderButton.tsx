import { ThumbSlideButton } from "components/ThumbSlideButton";
import { STATUS } from "constants/status";
import { type FC } from "react";
import Toast from "react-native-toast-message";
import { OrderStatusField, type Order } from "schema";
import { useUpdateOrderStatus } from "shared/useUpdateOrderStatusMutation";

interface Props {
  orderId: Order["id"];
  status: Order["status"];
}

const OrderCardSliderButton: FC<Props> = ({ orderId, status }) => {
  const [updateStatus, { loading }] = useUpdateOrderStatus();

  const handleOnSlideComplete = () => {
    if (status !== STATUS.PICKED_UP) {
      updateStatus({
        variables: {
          input: {
            orderId,
            status: OrderStatusField.PickedUp,
          },
        },
        onCompleted: () => {
          Toast.show({
            type: "accent",
            text1: "Enjoy your meal!",
          });
        },
      });
    }
  };

  return (
    <ThumbSlideButton
      inCompletedText="Slide to pickup"
      completedText="Picked Up!"
      isCompleted={status === STATUS.PICKED_UP}
      onSlideComplete={handleOnSlideComplete}
      loading={loading}
    />
  );
};

export { OrderCardSliderButton };
