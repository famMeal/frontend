import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Columns, Container, Typography } from "components";
import type { Dispatch, FC, SetStateAction } from "react";
import type { RootStackParamList } from "types/navigation.types";

type OrderStackProps = NativeStackScreenProps<
  RootStackParamList,
  "ClientOrders"
>;

interface Props extends OrderStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const OrdersScreen: FC<Props> = () => {
  return (
    <Container>
      <Box>
        <Columns>
          <Column>
            <Typography type="H2">Orders Guest</Typography>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { OrdersScreen };
