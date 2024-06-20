import { useNavigation } from "@react-navigation/native";
import { Box, Button, Column, Columns, Input, Typography } from "components";
import { COLOURS } from "constants/colours";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useEffect, useState, type FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import type { SignUpNavigationProps } from "types/navigation.types";
import { useClientSignUpMutation } from "./useClientSignUpMutation";

const ClientEmailSignUp: FC = () => {
  const { navigate } = useNavigation<SignUpNavigationProps>();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    return () =>
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });
  }, []);

  const toggleSecureTextEntry = () =>
    setSecureTextEntry(prevState => !prevState);

  const renderEyeIcon = () =>
    secureTextEntry ? (
      <EyeOffIcon color={COLOURS.accent} />
    ) : (
      <EyeIcon color={COLOURS.accent} />
    );

  const handleOnPressLogin = () => navigate("Login");

  const [signUp, { loading }] = useClientSignUpMutation({
    onCompleted: () => {
      navigate("VerifyAccount", { email: user.email.trim() });
    },
    onError: error => {
      Toast.show({
        text1: error.message,
        type: "error",
      });
    },
  });

  const handleOnPressSignUp = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const trimmedUser = {
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
      passwordConfirmation: user.passwordConfirmation.trim(),
    };

    if (!nameRegex.test(trimmedUser.firstName)) {
      Toast.show({
        text1: "Invalid first name. Only letters are allowed.",
        type: "error",
      });
      return;
    }

    if (!nameRegex.test(trimmedUser.lastName)) {
      Toast.show({
        text1: "Invalid last name. Only letters are allowed.",
        type: "error",
      });
      return;
    }

    if (!emailRegex.test(trimmedUser.email)) {
      Toast.show({
        text1: "Invalid email address.",
        type: "error",
      });
      return;
    }

    if (trimmedUser.password.length === 0) {
      Toast.show({
        text1: "Password cannot be empty.",
        type: "error",
      });
      return;
    }

    if (trimmedUser.password !== trimmedUser.passwordConfirmation) {
      Toast.show({
        text1: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    signUp({
      variables: {
        firstName: trimmedUser.firstName,
        lastName: trimmedUser.lastName,
        email: trimmedUser.email,
        password: trimmedUser.password,
        passwordConfirmation: trimmedUser.passwordConfirmation,
      },
    });
  };

  return (
    <Box>
      <ScrollView>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography type="S">
              To sign up, we only require your full name, email and a password.
              This information helps us create your account and provide you with
              secure access to our App.
            </Typography>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Typography weigth="semiBold" type="S">
              First Name
            </Typography>
            <Input
              keyboardType="default"
              onChangeText={firstName =>
                setUser(prev => ({ ...prev, firstName }))
              }
              value={user.firstName}
              theme="accent"
            />
          </Column>
          <Column>
            <Typography weigth="semiBold" type="S">
              Last Name
            </Typography>
            <Input
              keyboardType="default"
              onChangeText={lastName =>
                setUser(prev => ({ ...prev, lastName }))
              }
              value={user.lastName}
              theme="accent"
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Email
            </Typography>
            <Input
              keyboardType="email-address"
              onChangeText={email => setUser(prev => ({ ...prev, email }))}
              value={user.email}
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
              onChangeText={password =>
                setUser(prev => ({ ...prev, password }))
              }
              value={user.password}
              theme="accent"
            />
            <View className="absolute right-2 top-11">
              <Column>
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                  {renderEyeIcon()}
                </TouchableOpacity>
              </Column>
            </View>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Confirm password
            </Typography>
            <Input
              className="relative"
              secureTextEntry={secureTextEntry}
              onChangeText={passwordConfirmation =>
                setUser(prev => ({
                  ...prev,
                  passwordConfirmation,
                }))
              }
              value={user.passwordConfirmation}
              theme="accent"
            />
            <View className="absolute right-2 top-11">
              <Column>
                <TouchableOpacity onPress={toggleSecureTextEntry}>
                  {renderEyeIcon()}
                </TouchableOpacity>
              </Column>
            </View>
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
            <Button isLoading={loading} onPress={handleOnPressSignUp}>
              Sign up
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
      </ScrollView>
    </Box>
  );
};

export { ClientEmailSignUp };
