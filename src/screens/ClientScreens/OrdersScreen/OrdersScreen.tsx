import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Columns, Container, Typography } from "components";
import type { FC } from "react";
import type { RootStackParamList } from "types/navigation.types";

type Props = NativeStackScreenProps<RootStackParamList, "ClientOrders">;

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
