import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import { useDeleteOrderMutation } from "shared/useDeleteOrderMutation";
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
  const { userID, cart } = params;
  const [deleteOrder, { loading }] = useDeleteOrderMutation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const onPressGoBack = () => navigation.goBack();

  const onPressNavigateToMeals = () => navigation.navigate("Meals", { userID });

  const onCompleted = () => {
    navigation.navigate("Orders", { userID });
  };

  const handleOnPressDelete = () =>
    deleteOrder({
      variables: {
        input: {
          orderId: cart?.id!,
        },
      },
      onCompleted: onPressNavigateToMeals,
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
