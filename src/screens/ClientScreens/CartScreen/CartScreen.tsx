import type { NativeStackScreenProps } from "@react-navigation/native-stack";
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
  "CartScreen"
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

  const onCompleted = ({ placeOrder: { errors } }: PlaceOrderMutationData) => {
    if (errors?.length) {
      Toast.show({
        type: "error",
        text1: errors?.[0],
      });
    } else {
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
    return (
      <Cart
        setCart={setCart}
        isLoading={loading}
        userID={userID}
        cart={cart}
        onCompleted={onCompleted}
        onPressDelete={handleOnPressDelete}
        onPressGoBack={onPressGoBack}
      />
    );
  }
  return <EmptyCart onPress={onPressNavigateToMeals} />;
};

export { CartScreen };
