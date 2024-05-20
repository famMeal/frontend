import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import React, { useRef, useState, type FC } from "react";
import Toast from "react-native-toast-message";
import type {
  RootStackParamList,
  SignUpNavigationProps,
} from "types/navigation.types";

import type { TextInput } from "react-native";
import { useVerifyAccountMutation } from "./useVerifyAccountMutation";

type VerifyAccountStackProps = NativeStackScreenProps<
  RootStackParamList,
  "VerifyAccount"
>;

interface Props extends VerifyAccountStackProps {}

const VerifyAccountScreen: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { email } = params ?? {};
  const { navigate } = useNavigation<SignUpNavigationProps>();
  const [confirmationToken, setConfirmationToken] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOnPressLogin = () => navigate("Login");

  const [verifyAccount, { loading }] = useVerifyAccountMutation({
    onCompleted: handleOnPressLogin,
    onError: error => {
      Toast.show({
        text1: error.message,
        type: "error",
      });
    },
  });

  const tokens = confirmationToken.join("");

  const isValid = tokens.length === 6 && !!email;

  const handleInputChange = (index: number, value: string) => {
    const newConfirmationToken = [...confirmationToken];
    newConfirmationToken[index] = value;
    setConfirmationToken(newConfirmationToken);

    if (value && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleOnPresSignUp = () => {
    verifyAccount({
      variables: {
        email,
        confirmationToken: tokens,
      },
    });
  };

  const manageTheme = (index: number) =>
    confirmationToken[index] ? "primary" : "accent";

  return (
    <Container>
      <Box>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Confirmation Code
            </Typography>
          </Column>
        </Columns>
        <Columns direction="row" isMarginless>
          <Column columnWidth="fullWidth" direction="row" isPaddingless>
            <Columns direction="row">
              <Column direction="row" className="px-0">
                <Column columnWidth="oneThird" className="p-0">
                  <Input
                    theme={manageTheme(0)}
                    ref={inputRefs[0]}
                    inputWidth="fixed"
                    maxLength={1}
                    value={confirmationToken[0]}
                    onChangeText={value => handleInputChange(0, value)}
                  />
                </Column>
                <Column columnWidth="oneThird" className="p-0">
                  <Input
                    theme={manageTheme(1)}
                    ref={inputRefs[1]}
                    inputWidth="fixed"
                    maxLength={1}
                    value={confirmationToken[1]}
                    onChangeText={value => handleInputChange(1, value)}
                  />
                </Column>
                <Column columnWidth="oneThird" className="mr-0 p-0">
                  <Input
                    theme={manageTheme(2)}
                    ref={inputRefs[2]}
                    inputWidth="fixed"
                    maxLength={1}
                    value={confirmationToken[2]}
                    onChangeText={value => handleInputChange(2, value)}
                  />
                </Column>
              </Column>
              <Column
                justifyContent="space-between"
                direction="row"
                className="px-0">
                <Column columnWidth="oneThird">
                  <Input
                    theme={manageTheme(3)}
                    ref={inputRefs[3]}
                    inputWidth="fixed"
                    maxLength={1}
                    value={confirmationToken[3]}
                    onChangeText={value => handleInputChange(3, value)}
                  />
                </Column>
                <Column columnWidth="oneThird">
                  <Input
                    theme={manageTheme(4)}
                    ref={inputRefs[4]}
                    inputWidth="fixed"
                    maxLength={1}
                    value={confirmationToken[4]}
                    onChangeText={value => handleInputChange(4, value)}
                  />
                </Column>
                <Column columnWidth="oneThird" className="mr-0">
                  <Input
                    theme={manageTheme(5)}
                    ref={inputRefs[5]}
                    inputWidth="fixed"
                    maxLength={1}
                    value={confirmationToken[5]}
                    onChangeText={value => handleInputChange(5, value)}
                  />
                </Column>
              </Column>
            </Columns>
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button
              disabled={!isValid}
              isLoading={loading}
              onPress={handleOnPresSignUp}>
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
