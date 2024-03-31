import { useAccordionContext } from "components/Accordion/AccordionContext";
import { COLOURS } from "constants/colours";
import { STATUS } from "constants/status";
import { type FC } from "react";
import SlideButton from "rn-slide-button";
import type { Order } from "schema";
import { useUpdateOrderStatus } from "shared/useUpdateOrderStatusMutation";

interface Props {
  orderId: Order["id"];
}

const OrderCardSliderButton: FC<Props> = ({ orderId }) => {
  const [updateStatus, { loading }] = useUpdateOrderStatus();
  const { setIsOpen } = useAccordionContext();

  const handleOnSlideComplete = () => {
    updateStatus({
      variables: {
        input: {
          orderId,
          status: STATUS.PICKED_UP,
        },
      },
      onCompleted: () => setIsOpen(false),
    });
  };

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
    />
  );
};

export { OrderCardSliderButton };
