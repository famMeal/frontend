import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import type { FC } from "react";
import React from "react";
import { ExclamationTriangleIcon } from "react-native-heroicons/solid";

interface Props {
  onPress: () => void;
}

const EmptyCart: FC<Props> = ({ onPress }) => {
  return (
    <Container>
      <Columns>
        <Column columnWidth="fullWidth">
          <Box>
            <Columns>
              <Column
                columnWidth="fullWidth"
                alignItems="center"
                justifyContent="center">
                <Typography weigth="bold" type="H3" className="text-center">
                  Your cart is empty
                </Typography>
                <ExclamationTriangleIcon size={100} color={COLOURS.accent} />
              </Column>
            </Columns>

            <Button onPress={onPress}>View Meals</Button>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { EmptyCart };
