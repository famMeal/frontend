import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Columns, Container, Typography } from "components";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import type { RootStackParamList } from "types/navigation.types";

const sumCurrency = (currency: string, quantity = 0) => {
  const numericCurrency = currency.replace(/[^0-9.]/g, "");

  const currencyValue = parseFloat(numericCurrency);

  const sum = currencyValue * quantity!;

  return sum.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

type ConfirmationStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Confirmation"
>;

interface Props extends ConfirmationStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const ConfirmationScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route;
  const { cart } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  return (
    <Container>
      <Columns>
        <Column>
          <Box>
            <Typography className="text-center" type="H3" weigth="semiBold">
              Order summary
            </Typography>
            <Columns className="border border-stone-300 rounded-md border-dashed">
              <Column isPaddingless className="-ml-1">
                <Columns isMarginless>
                  <Column>
                    <Typography>
                      <Typography weigth="bold">{cart.quantity} x </Typography>
                      {cart.meal.name}
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end">
                    <Typography>
                      {sumCurrency(cart.meal.price, cart.quantity!)}
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
                    <Typography isMarginless>{cart.subtotal}</Typography>
                  </Column>
                </Columns>
                <Columns isMarginless>
                  <Column className="pt-0">
                    <Typography isMarginless weigth="semiBold">
                      Taxes
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end pt-0">
                    <Typography isMarginless>{cart.taxes}</Typography>
                  </Column>
                </Columns>
                <Columns isMarginless>
                  <Column className="pt-0">
                    <Typography isMarginless weigth="semiBold">
                      Total
                    </Typography>
                  </Column>
                  <Column flex="shrink" className="items-end pt-0">
                    <Typography isMarginless>{cart.total}</Typography>
                  </Column>
                </Columns>
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { ConfirmationScreen };
