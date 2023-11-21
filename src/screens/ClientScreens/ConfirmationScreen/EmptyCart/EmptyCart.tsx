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
        <Column>
          <Box>
            <Columns>
              <Column>
                <Typography weigth="bold" type="H3" className="text-center">
                  Your cart is empty
                </Typography>
              </Column>
            </Columns>
            <Columns>
              <Column className="justify-center items-center">
                <ExclamationTriangleIcon size={100} color={COLOURS.accent} />
              </Column>
            </Columns>
            <Columns>
              <Column isPaddingless>
                <Button onPress={onPress}>View Meals</Button>
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { EmptyCart };
