import { Column, Columns, Typography } from "components";
import type { BottomDrawerProps } from "components/BottomDrawer";
import { BottomDrawer } from "components/BottomDrawer";
import type { FC } from "react";
import React from "react";
import type { PlaceOrderMutationData } from "../usePlaceOrderMutation";

interface Props extends BottomDrawerProps {
  order?: PlaceOrderMutationData["placeOrder"]["order"];
}

const PaymentDrawer: FC<Props> = ({ ...rest }) => {
  return (
    <BottomDrawer {...rest}>
      <Columns>
        <Column>
          <Typography>hello</Typography>
        </Column>
      </Columns>
    </BottomDrawer>
  );
};

export { PaymentDrawer };
