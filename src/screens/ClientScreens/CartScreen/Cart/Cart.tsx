import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  RadioGroup,
  Typography,
} from "components";
import { RadioButton } from "components/RadioGroup/RadioButton";
import { COLOURS } from "constants/colours";
import { TrashIcon } from "lucide-react-native";
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState, type FC } from "react";
import { ScrollView } from "react-native";
import type { Order, User } from "schema";
import { OrderStatusField } from "schema";
import { GET_MEALS_QUERY } from "screens/ClientScreens/MealsScreen/Meals/useGetMealsQuery";
import { GET_USER_0RDERS_QUERY } from "screens/ClientScreens/OrdersScreen/useGetUserOrdersQuery";
import type { GetOrderQueryVariables } from "shared/useGetOrderQuery";
import {
  GET_ORDER_QUERY,
  type GetOrderQueryData,
} from "shared/useGetOrderQuery";
import { formatTime } from "utilities/formatTime";
import type { PlaceOrderMutationData } from "./usePlaceOrderMutation";
import { usePlaceOrderMutation } from "./usePlaceOrderMutation";
import { useUpdateOrderTipMutation } from "./useUpdateOrderTipMutation";

const tipOptions = [
  { label: "10%", value: "10" },
  { label: "15%", value: "15" },
  { label: "18%", value: "18" },
  { label: "20%", value: "20" },
];

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
  onCompleted: (data: PlaceOrderMutationData) => void;
  setCart: Dispatch<SetStateAction<GetOrderQueryData["order"]>>;
  userID: User["id"];
}

const Cart: FC<Props> = ({
  isLoading,
  cart,
  onPressDelete,
  onPressGoBack,
  userID,
  onCompleted,
  setCart,
}) => {
  const {
    meal,
    taxes,
    tipAmount,
    tipPercentage,
    total,
    quantity,
    id,
    pickupEndTime,
    pickupStartTime,
  } = cart ?? {};
  const [placeOrder, { loading }] = usePlaceOrderMutation();
  const [selectedTip, setSelectedTip] = useState("0");
  const [updateTip] = useUpdateOrderTipMutation();

  useEffect(() => {
    if (tipPercentage && tipPercentage > 0) {
      setSelectedTip(String(tipPercentage));
    }
  }, [tipPercentage]);

  const handleUpdateTip = (tipPercentage: Order["tipPercentage"]) => {
    updateTip({
      variables: {
        input: {
          tipPercentage,
          orderId: cart?.id!,
        },
      },

      update: (cache, { data }) => {
        const cacheData = cache?.readQuery<
          GetOrderQueryData,
          GetOrderQueryVariables
        >({
          query: GET_ORDER_QUERY,
          variables: {
            id: id!,
          },
        });

        if (cacheData?.order) {
          cache.writeQuery<GetOrderQueryData, GetOrderQueryVariables>({
            query: GET_ORDER_QUERY,
            variables: {
              id: id!,
            },
            data: {
              ...cacheData,
              order: {
                ...cacheData?.order,
                ...data?.updateOrder,
              },
            },
          });
        }
      },
      onCompleted: ({ updateOrder }) => {
        setCart(updateOrder?.order);
        setSelectedTip(String(tipPercentage));
      },
    });
  };

  const onPressPlaceOrder = () => {
    placeOrder({
      variables: {
        input: {
          orderId: id!,
          pickupEndTime: pickupEndTime,
          pickupStartTime: pickupStartTime,
          quantity: quantity,
        },
      },
      refetchQueries: [
        GET_MEALS_QUERY,
        {
          query: GET_USER_0RDERS_QUERY,
          variables: {
            id: userID,
            filters: {
              statusList: [
                OrderStatusField.Preparing,
                OrderStatusField.Ready,
                OrderStatusField.PickedUp,
              ],
            },
          },
        },
      ],
      onCompleted,
    });
  };

  const renderTip = () =>
    tipPercentage && tipPercentage > 0 ? (
      <Columns>
        <Column justifyContent="flex-end">
          <Typography type="S" isMarginless>
            Tip
          </Typography>
        </Column>
        <Column alignItems="flex-end" justifyContent="flex-end">
          <Typography type="S" isMarginless className="mr-4 ml-2">
            <Button
              onPress={() => handleUpdateTip(0)}
              isClean
              isOutlined
              isIcon>
              <TrashIcon color={COLOURS.error} size={20} />
            </Button>
            {tipAmount}
          </Typography>
        </Column>
      </Columns>
    ) : null;

  return (
    <Container className="flex flex-col justify-between">
      <ScrollView>
        <Columns isMarginless>
          <Column
            columnWidth="fullWidth"
            justifyContent="center"
            alignItems="center">
            <Box>
              <Typography className="mt-4" type="H3" weigth="bold">
                Summary
              </Typography>
              <Columns isMarginless>
                <Column>
                  <Typography isMarginless type="S" weigth="bold">
                    ({quantity}x){" "}
                    <Typography type="S" isMarginless>
                      {meal?.name}
                    </Typography>
                  </Typography>
                </Column>
                <Column alignItems="flex-end">
                  <Typography type="S" className="mr-4">
                    {sumCurrency(meal?.price!, quantity!)}
                  </Typography>
                </Column>
              </Columns>
              <Columns isMarginless className="border-t mt-2 pb-2 border-b">
                <Column>
                  <Typography
                    type="S"
                    isMarginless
                    weigth="semiBold"
                    className="mt-4">
                    Subtotal
                  </Typography>
                </Column>
                <Column alignItems="flex-end">
                  <Typography type="S" isMarginless className="mr-4 mt-4">
                    {cart?.subtotal}
                  </Typography>
                </Column>
              </Columns>
              {renderTip()}
              <Columns
                isMarginless
                className={tipPercentage ? "-mt-4" : "mt-2"}>
                <Column>
                  <Typography type="S" isMarginless>
                    Taxes
                  </Typography>
                </Column>
                <Column alignItems="flex-end">
                  <Typography type="S" isMarginless className="mr-4">
                    {taxes}
                  </Typography>
                </Column>
              </Columns>
              <Columns className="border-t mt-2">
                <Column>
                  <Typography isMarginless weigth="bold" className="mt-4">
                    Total
                  </Typography>
                </Column>
                <Column alignItems="flex-end">
                  <Typography weigth="bold" isMarginless className="mr-4 mt-4">
                    {total}
                  </Typography>
                </Column>
              </Columns>
              <Columns isMarginless>
                <Column>
                  <Button
                    isOutlined
                    isClean
                    isLoading={isLoading}
                    onPress={onPressDelete}
                    theme="accent">
                    Remove
                  </Button>
                </Column>
                <Column>
                  <Button onPress={onPressGoBack} isOutlined theme="accent">
                    Edit
                  </Button>
                </Column>
              </Columns>
            </Box>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Box>
              <Typography isMarginless className="mt-4" type="H3" weigth="bold">
                Tip
              </Typography>
              <Typography className="mb-4" type="S">
                All tips goes to the restaurant
              </Typography>
              <RadioGroup
                selectedValue={selectedTip}
                onValueChange={value => handleUpdateTip(Number(value))}>
                {tipOptions.map(option => (
                  <RadioButton
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </RadioGroup>
            </Box>
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
