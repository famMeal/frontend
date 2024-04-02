import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import type { FC } from "react";
import { ScrollView } from "react-native";
import type { User } from "schema";
import type { GetOrderQueryData } from "screens/ClientScreens/MealsScreen/MealScreen/useGetOrderQuery";
import { GET_USER_0RDERS_QUERY } from "screens/ClientScreens/OrdersScreen/useGetUserOrdersQuery";
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
  isLoading: boolean;
  cart: GetOrderQueryData["order"];
  onPressGoBack: () => void;
  onPressDelete: () => void;
  onCompleted: () => void;
  userID: User["id"];
}

const Cart: FC<Props> = ({
  isLoading,
  cart,
  onPressDelete,
  onPressGoBack,
  userID,
  onCompleted,
}) => {
  const [placeOrder, { loading }] = usePlaceOrderMutation();

  const onPressPlaceOrder = () => {
    placeOrder({
      variables: {
        input: {
          orderId: cart?.id!,
          pickupEndTime: cart?.pickupEndTime,
          pickupStartTime: cart?.pickupStartTime,
          quantity: cart?.quantity,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_0RDERS_QUERY,
          variables: {
            id: userID,
          },
        },
      ],
      onCompleted,
    });
  };

  return (
    <Container className="flex flex-col justify-between">
      <ScrollView>
        <Columns isMarginless>
          <Column
            columnWidth="fullWidth"
            justifyContent="center"
            alignItems="center">
            <Box>
              <Typography type="H3" weigth="bold" className="mt-4">
                Pick up Location
              </Typography>
              <Columns isMarginless>
                <Column>
                  <Typography isMarginless weigth="bold">
                    {cart?.restaurant?.name}
                  </Typography>
                  <Typography type="S" isMarginless>
                    {cart?.restaurant?.addressLine1}
                  </Typography>
                  <Typography isMarginless type="S">
                    {cart?.restaurant?.postalCode} {cart?.restaurant?.city}
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
              <Typography className="mt-4" type="H3" weigth="bold">
                Summary
              </Typography>
              <Columns isMarginless>
                <Column>
                  <Typography isMarginless type="S" weigth="bold">
                    ({cart?.quantity}x){" "}
                    <Typography type="S" isMarginless>
                      {cart?.meal?.name}
                    </Typography>
                  </Typography>
                </Column>
                <Column alignItems="flex-end">
                  <Typography type="S" className="mr-4">
                    {sumCurrency(cart?.meal?.price!, cart?.quantity!)}
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
                  <Button
                    isLoading={isLoading}
                    onPress={onPressDelete}
                    theme="accent">
                    Remove
                  </Button>
                </Column>
              </Columns>
            </Box>
          </Column>
        </Columns>
      </ScrollView>
      <Columns isMarginless>
        <Column columnWidth="fullWidth">
          <Box>
            <Button onPress={onPressPlaceOrder} isLoading={loading}>
              Place order
            </Button>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { Cart };
