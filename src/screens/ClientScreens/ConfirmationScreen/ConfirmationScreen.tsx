import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useDeleteOrderMutation } from "shared/useDeleteOrderMutation";
import type { GetOrderQueryData } from "shared/useGetOrderQuery";
import type { RootStackParamList } from "types/navigation.types";
import { Cart } from "./Cart";
import { EmptyCart } from "./EmptyCart";

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

  const onCompleted = () => {
    setCart(undefined);
    navigation.navigate("Orders", { userID });
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

export { ConfirmationScreen };
