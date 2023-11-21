import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import type { FC } from "react";
import type { AddToCartData } from "screens/ClientScreens/MealsScreen/MealScreen/useAddToCartMutation";
import { formatTime } from "utilities";
import { usePlaceOrderMutation } from "./usePlaceOrderMutation";

const sumCurrency = (currency: string, quantity = 0) => {
  const numericCurrency = currency.replace(/[^0-9.]/g, "");

  const currencyValue = parseFloat(numericCurrency);

  const sum = currencyValue * quantity!;

  return sum.toLocaleString("en-US", {
    style: "currency",
    currency: "CAD",
  });
};

interface Props {
  cart: AddToCartData;
  onPressGoBack: () => void;
  onPressDelete: () => void;
  onCompleted: () => void;
}

const Cart: FC<Props> = ({
  cart,
  onPressDelete,
  onPressGoBack,
  onCompleted,
}) => {
  const [placeOrder, { loading }] = usePlaceOrderMutation();

  const onPressPlaceOrder = () =>
    placeOrder({
      variables: {
        input: {
          orderId: cart?.id,
          pickupEndTime: cart.pickupEndTime,
          pickupStartTime: cart.pickupStartTime,
          quantity: cart?.quantity,
        },
      },
      onCompleted,
    });

  return (
    <Container>
      <Columns>
        <Column>
          <Box className=" -mb-2">
            <Typography className="text-center" type="H3" weigth="semiBold">
              Order summary
            </Typography>
            <Columns className="border border-stone-300 rounded-md border-dashed">
              <Column isPaddingless className="-ml-1">
                <Columns isMarginless>
                  <Column>
                    <Typography>
                      <Typography weigth="bold">{cart?.quantity} x </Typography>
                      {cart?.meal.name}
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end">
                    <Typography>
                      {sumCurrency(cart?.meal.price, cart?.quantity!)}
                    </Typography>
                  </Column>
                </Columns>
                <Columns isMarginless>
                  <Column>
                    <Typography isMarginless weigth="semiBold">
                      Subtotal
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end">
                    <Typography isMarginless>{cart?.subtotal}</Typography>
                  </Column>
                </Columns>
                <Columns isMarginless>
                  <Column className="pt-0">
                    <Typography isMarginless weigth="semiBold">
                      Taxes
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end pt-0">
                    <Typography isMarginless>{cart?.taxes}</Typography>
                  </Column>
                </Columns>
                <Columns isMarginless>
                  <Column className="pt-0 ">
                    <Typography isMarginless weigth="semiBold">
                      Total
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end pt-0">
                    <Typography isMarginless>{cart?.total}</Typography>
                  </Column>
                </Columns>
              </Column>
            </Columns>
            <Columns isMarginless className="mt-4">
              <Column flex="one" isPaddingless>
                <Button onPress={onPressGoBack} isOutlined theme="accent">
                  Edit
                </Button>
              </Column>
              <Column flex="one" isPaddingless>
                <Button onPress={onPressDelete} theme="accent">
                  Delete
                </Button>
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Box>
            <Columns>
              <Column>
                <Typography type="H3" weigth="semiBold" className="text-center">
                  Pick up Location
                </Typography>
                <Typography weigth="bold">{cart?.restaurant.name}</Typography>
                <Typography>{cart?.restaurant.addressLine1}</Typography>
                <Typography>
                  {cart?.restaurant.postalCode} {cart?.restaurant.city}
                </Typography>
                <Typography weigth="bold">Pick up between</Typography>
                <Typography>
                  {formatTime(cart?.pickupStartTime)} and{" "}
                  {formatTime(cart?.pickupEndTime)}
                </Typography>
              </Column>
            </Columns>
            <Columns>
              <Column isPaddingless>
                <Button isLoading={loading} onPress={onPressPlaceOrder}>
                  Place Order
                </Button>
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { Cart };
