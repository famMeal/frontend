import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { ShoppingCartIcon } from "lucide-react-native";
import type { FC } from "react";
import React from "react";

interface Props {
  onPress: () => void;
}

const EmptyCart: FC<Props> = ({ onPress }) => {
  return (
    <Container>
      <Box>
        <Columns>
          <Column
            columnWidth="fullWidth"
            alignItems="center"
            justifyContent="center">
            <Typography weigth="bold" type="H3" className="text-center mb-6">
              Your cart is empty
            </Typography>
            <ShoppingCartIcon size={100} color={COLOURS.accent} />
          </Column>
        </Columns>
        <Button className="mt-6" onPress={onPress}>
          View Meals
        </Button>
      </Box>
    </Container>
  );
};

export { EmptyCart };
