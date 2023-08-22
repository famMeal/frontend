import { Column, Columns, Container, Typography } from "components";
import type { FC } from "react";

const CreateMealScreen: FC = () => {
  return (
    <Container>
      <Columns>
        <Column>
          <Typography weigth="bold" type="H1">
            Create Meal
          </Typography>
        </Column>
      </Columns>
    </Container>
  );
};

export { CreateMealScreen };
