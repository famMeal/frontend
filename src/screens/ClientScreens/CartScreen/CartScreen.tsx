import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useDeleteOrderMutation } from "shared/useDeleteOrderMutation";
import type { GetOrderQueryData } from "shared/useGetOrderQuery";
import type { RootStackParamList } from "types/navigation.types";
import { Cart } from "./Cart";
import type { PlaceOrderMutationData } from "./Cart/usePlaceOrderMutation";
import { EmptyCart } from "./EmptyCart";

type ConfirmationStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Cart"
>;

interface Props extends ConfirmationStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const CartScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const { params } = route;
  const { userID, orderID, cart: cartOrder } = params;
  const [cart, setCart] = useState<GetOrderQueryData["order"]>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name)
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  useEffect(() => {
    setCart(cartOrder);
  }, [cartOrder]);

  const [deleteOrder, { loading }] = useDeleteOrderMutation();

  const onPressGoBack = () => navigation.goBack();

  const onPressNavigateToMeals = () => {
    setCart(undefined);

    navigation.navigate("Meals", { userID });
  };

  const resetOrderOnCompleted = () => {
    setCart(undefined);
    Toast.show({
      type: "accent",
      text1: "Order Placed",
    });

    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
    navigation.navigate("Orders", { userID });
  };

  const initializePaymentSheet = async (
    paymentIntent: string,
    ephemeralKey: string,
    customerId: string
  ) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Batch App",
      customerId: customerId,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      returnURL: "https://batch-app.info/",
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });

    if (!error) {
      openPaymentSheet();
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Toast.show({
        type: "error",
        text1: `Error code: ${error.code}, ${error.message}`,
      });
    } else {
      resetOrderOnCompleted();
    }
  };

  const onCompleted = ({
    placeOrder: { errors, paymentIntent, ephemeralKey, customerId },
  }: PlaceOrderMutationData) => {
    if (errors?.length) {
      Toast.show({
        type: "error",
        text1: errors?.[0],
      });
    } else {
      initializePaymentSheet(paymentIntent, ephemeralKey, customerId);
    }
  };

  const handleOnPressDelete = () =>
    deleteOrder({
      variables: {
        input: {
          orderId: orderID,
        },
      },
      onCompleted: onPressNavigateToMeals,
      update: cache => {
        cache.evict({
          id: cache.identify({ __typename: "Order", id: orderID }),
        });
        cache.gc();
      },
    });

  if (cart) {
    const stripeAccountId = cart.restaurant?.stripeAccountId || "";
    return (
      <Cart
        setCart={setCart}
        isLoading={loading}
        userID={userID}
        cart={cart}
        stripeAccountId={stripeAccountId}
        onCompleted={onCompleted}
        onPressDelete={handleOnPressDelete}
        onPressGoBack={onPressGoBack}
      />
    );
  }
  return <EmptyCart onPress={onPressNavigateToMeals} />;
};

export { CartScreen };
