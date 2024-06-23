import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Logo from "assets/svgs/logo.svg";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import type { FC } from "react";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import type {
  LoginNavigationProps,
  RootStackParamList,
} from "types/navigation.types";
import { useLoginMutation } from "./useLogInMutation";

const Screens = {
  Restaurants: "Restaurants",
  Clients: "Clients",
  SignUp: "SignUp",
  Splash: "Splash",
} as const;

type VerifyAccountStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

interface Props extends VerifyAccountStackProps {}

const LoginScreen: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { email: forwardedEmail } = params ?? {};
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState(
    forwardedEmail ? forwardedEmail : "shahynkamali+1@gmail.com"
  );
  const [password, setPassword] = useState("password");
  const { navigate } = useNavigation<LoginNavigationProps>();

  const [userLogin, { loading }] = useLoginMutation({
    onCompleted: ({ userLogin: { credentials } }) => {
      if (credentials) {
        Promise.all(
          Object.entries(credentials).map(([key, value]) =>
            AsyncStorage.setItem(key, String(value))
          )
        ).then(() => {
          navigate(Screens.Splash);
        });
      }
    },
    onError: error => {
      Toast.show({
        text1: error.message,
        type: "error",
      });
    },
  });

  const handleOnPressLogin = () => {
    userLogin({
      variables: {
        email: email.trim(),
        password: password.trim(),
      },
    });
  };

  const toggleSecureTextEntry = () => setSecureTextEntry(prev => !prev);

  const renderEyeIcon = () =>
    secureTextEntry ? (
      <EyeOffIcon color={COLOURS.accent} />
    ) : (
      <EyeIcon color={COLOURS.accent} />
    );

  const handleOnSignUpPress = () => navigate(Screens.SignUp);

  return (
    <Container className="flex flex-col justify-center items-center">
      <Columns>
        <Column
          alignItems="center"
          columnWidth="fullWidth"
          justifyContent="center">
          <Logo width={300} height={100} />
        </Column>
      </Columns>
      <Box className="mt-4">
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Email
            </Typography>
            <Input
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
              theme="accent"
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Password
            </Typography>
            <Input
              secureTextEntry={secureTextEntry}
              onChangeText={setPassword}
              value={password}
              theme="accent"
            />
            <View className="absolute right-2 top-11">
              <TouchableOpacity onPress={toggleSecureTextEntry}>
                {renderEyeIcon()}
              </TouchableOpacity>
            </View>
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button isLoading={loading} onPress={handleOnPressLogin}>
              Login
            </Button>
          </Column>
        </Columns>
        <Columns className="mt-8">
          <Column
            alignItems="flex-end"
            justifyContent="center"
            columnWidth="twoThird">
            <Typography type="S">Don't have an account?</Typography>
          </Column>
          <Column columnWidth="oneThird" justifyContent="center">
            <Button
              onPress={handleOnSignUpPress}
              theme="accent"
              isOutlined
              isClean>
              Sign Up
            </Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { LoginScreen };
