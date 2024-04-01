import { useAccordionContext } from "components/Accordion/AccordionContext";
import { ThumbSlideButton } from "components/ThumbSlideButton";
import { STATUS } from "constants/status";
import { type FC } from "react";
import type { Order } from "schema";
import { useUpdateOrderStatus } from "shared/useUpdateOrderStatusMutation";

interface Props {
  orderId: Order["id"];
  status: Order["status"];
}

const OrderCardSliderButton: FC<Props> = ({ orderId, status }) => {
  const [updateStatus, { loading }] = useUpdateOrderStatus();
  const { setIsOpen } = useAccordionContext();

  const handleOnSlideComplete = () => {
    if (status !== STATUS.PICKED_UP) {
      updateStatus({
        variables: {
          input: {
            orderId,
            status: STATUS.PICKED_UP,
          },
        },
        onCompleted: () => setIsOpen(false),
      });
    }
  };

  return (
    <ThumbSlideButton
      isCompleted={status === STATUS.PICKED_UP}
      onSlideComplete={handleOnSlideComplete}
      loading={loading}
    />
  );
};

export { OrderCardSliderButton };
