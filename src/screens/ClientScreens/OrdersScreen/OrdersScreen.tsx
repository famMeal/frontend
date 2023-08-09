import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { Dispatch, FC, SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";

import { Columns, Container, Typography } from "components";
import { useEffect } from "react";

type OrdersStackProps = NativeStackScreenProps<RootStackParamList, "Orders">;

interface Props extends OrdersStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const OrdersScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveScreen(route.name);
    });
    return unsubscribe;
  }, [navigation, setActiveScreen, route.name]);

  return (
    <Container>
      <Columns>
        <Typography>orders</Typography>
      </Columns>
    </Container>
  );
};

export { OrdersScreen };
