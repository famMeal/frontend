import type { FC } from "react";
import type { User } from "schema";
import { Box, Typography, Input, Column, Columns } from "components";

interface Props {
  user: Partial<Pick<User, "email" | "firstName" | "lastName">>;
}

const UserForm: FC<Props> = ({ user: { firstName, lastName, email } }) => {
  return (
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
        <Column>
          <Typography weigth="semiBold" type="S">
            Email
          </Typography>
          <Input editable={false} value={email ?? ""} />
        </Column>
      </Columns>
    </Box>
  );
};

export { UserForm };
