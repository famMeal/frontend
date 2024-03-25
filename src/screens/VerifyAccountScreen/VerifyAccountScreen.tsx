import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import { useState, type FC } from "react";
import type { SignUpNavigationProps } from "types/navigation.types";
import { useVerifyAccountMutation } from "./useVerifyAccountMutation";
import type { RootStackParamList } from "types/navigation.types";

type VerifyAccountStackProps = NativeStackScreenProps<
  RootStackParamList,
  "VerifyAccount"
>;

interface Props extends VerifyAccountStackProps {}

const VerifyAccountScreen: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { email } = params;
  const { navigate } = useNavigation<SignUpNavigationProps>();
  const [confirmationToken, setConfirmationToken] = useState("");

  const handleOnPressLogin = () => navigate("Login");

  const [verifyAccount, { loading }] = useVerifyAccountMutation({
    onCompleted: () => {
      navigate("Login");
    },
    onError: error => {
      console.error("Sign up error:", error.message);
    },
  });
  const handleOnPresSignUp = () => {
    verifyAccount({
      variables: {
        email,
        confirmationToken,
      },
    });
  };

  return (
    <Container>
      <Box>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Confirmation Code
            </Typography>
            <Input
              className="relative"
              onChangeText={newText => setConfirmationToken(newText)}
              value={confirmationToken}
              theme="accent"
            />
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button isLoading={loading} onPress={handleOnPresSignUp}>
              Verify Account
            </Button>
          </Column>
        </Columns>
        <Columns className="mt-8">
          <Column
            alignItems="flex-end"
            justifyContent="center"
            columnWidth="twoThird">
            <Typography type="S">Already have an account?</Typography>
          </Column>
          <Column columnWidth="oneThird" justifyContent="center">
            <Button
              onPress={handleOnPressLogin}
              theme="accent"
              isOutlined
              isClean>
              Login
            </Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { VerifyAccountScreen };
