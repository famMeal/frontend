import { Box, Column, Columns, Container, Input, Typography } from "components";
import type { FC } from "react";
import type { User } from "schema";

interface Props {
  user: Partial<Pick<User, "email" | "firstName" | "lastName">>;
}

const UserForm: FC<Props> = ({ user: { firstName, lastName, email } }) => {
  return (
    <Container className="mx-4 mt-4">
      <Box>
        <Columns>
          <Column>
            <Typography weigth="semiBold" type="S">
              First name
            </Typography>
            <Input editable={false} value={firstName ?? ""} />
          </Column>
          <Column>
            <Typography weigth="semiBold" type="S">
              Last name
            </Typography>
            <Input editable={false} value={lastName ?? ""} />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Email
            </Typography>
            <Input editable={false} value={email ?? ""} />
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { UserForm };
