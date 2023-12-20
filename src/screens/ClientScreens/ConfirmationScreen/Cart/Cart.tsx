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
import { formatTime } from "utilities/formatTime";
import { usePlaceOrderMutation } from "./usePlaceOrderMutation";

const sumCurrency = (currency: string, quantity = 0) => {
  const numericCurrency = currency.replace(/[^0-9.]/g, "");

  const currencyValue = parseFloat(numericCurrency);

  const sum = currencyValue * quantity!;

  return sum.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
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
    <Container className="flex flex-col justify-between">
      <Columns isMarginless className="px-4 mt-4">
        <Column columnWidth="fullWidth">
          <Box>
            <Typography type="H3" weigth="semiBold" className="text-center">
              Pick up Location
            </Typography>
            <Columns isMarginless>
              <Column>
                <Typography isMarginless weigth="bold">
                  {cart?.restaurant.name}
                </Typography>
                <Typography type="S" isMarginless>
                  {cart?.restaurant.addressLine1}
                </Typography>
                <Typography isMarginless type="S">
                  {cart?.restaurant.postalCode} {cart?.restaurant.city}
                </Typography>
              </Column>
              <Column>
                <Typography isMarginless weigth="bold">
                  Pick up window:
                </Typography>
                <Typography type="S">
                  {formatTime(cart?.pickupStartTime)} and{" "}
                  {formatTime(cart?.pickupEndTime)}
                </Typography>
              </Column>
            </Columns>
          </Box>
          <Box>
            <Typography className="text-center" type="H3" weigth="semiBold">
              Order summary
            </Typography>
            <Columns isMarginless>
              <Column>
                <Typography isMarginless type="S" weigth="bold">
                  ({cart?.quantity}x){" "}
                  <Typography type="S" isMarginless>
                    {cart?.meal.name}
                  </Typography>
                </Typography>
              </Column>
              <Column alignItems="flex-end">
                <Typography type="S" className="mr-4">
                  {sumCurrency(cart?.meal.price, cart?.quantity!)}
                </Typography>
              </Column>
            </Columns>
            <Columns isMarginless>
              <Column>
                <Typography type="S" isMarginless weigth="semiBold">
                  Subtotal
                </Typography>
              </Column>
              <Column alignItems="flex-end">
                <Typography type="S" isMarginless className="mr-4">
                  {cart?.subtotal}
                </Typography>
              </Column>
            </Columns>
            <Columns>
              <Column>
                <Typography type="S" isMarginless weigth="semiBold">
                  Taxes
                </Typography>
              </Column>
              <Column alignItems="flex-end">
                <Typography type="S" isMarginless className="mr-4">
                  {cart?.taxes}
                </Typography>
              </Column>
            </Columns>
            <Columns className="border-t pt-2">
              <Column>
                <Typography isMarginless weigth="semiBold">
                  Total
                </Typography>
              </Column>
              <Column alignItems="flex-end">
                <Typography isMarginless className="mr-4">
                  {cart?.total}
                </Typography>
              </Column>
            </Columns>
            <Columns isMarginless>
              <Column>
                <Button
                  onPress={onPressGoBack}
                  isClean
                  isOutlined
                  theme="accent">
                  Edit
                </Button>
              </Column>
              <Column>
                <Button onPress={onPressDelete} theme="accent">
                  Remove
                </Button>
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
      <Columns isMarginless className="p-4">
        <Column columnWidth="fullWidth">
          <Box>
            <Button isLoading={loading} onPress={onPressPlaceOrder}>
              Place order
            </Button>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { Cart };