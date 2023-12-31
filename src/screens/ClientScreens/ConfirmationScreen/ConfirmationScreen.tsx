import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const onPressGoBack = () => navigation.goBack();

  const onPressNavigateToMeals = () => navigation.navigate("Meals");

  const onCompleted = () => navigation.navigate("Orders");

  if (params?.cart) {
    return (
      <Cart
        cart={params.cart}
        onCompleted={onCompleted}
        onPressDelete={onPressNavigateToMeals}
        onPressGoBack={onPressGoBack}
      />
    );
  }
  return <EmptyCart onPress={onPressNavigateToMeals} />;
};

export { ConfirmationScreen };
