import { useNavigation } from "@react-navigation/native";
import { Box, Button, Column, Columns, Input, Typography } from "components";
import { COLOURS } from "constants/colours";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState, type FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import type { SignUpNavigationProps } from "types/navigation.types";
import { RestaurantsLocationsModal } from "./RestaurantLocationsModal";
import { useRestaurantSignUpMutation } from "./useRestaurantSignUpMutation";

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const textRegex = /^[A-Za-z0-9\s]+$/;
const certificateNumberRegex = /^[A-Z0-9]{6,10}$/;
const cityRegex = /^[A-Za-z\s\-']{1,50}$/;

const RestaurantEmailSignUp: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { navigate } = useNavigation<SignUpNavigationProps>();
  const [user, setUser] = useState({
    firstName: "Beschumi",
    lastName: "Steve",
    restaurantName: "The Keg",
    city: "Toronto",
    foodhandlersCertificate: "ABC123456",
    email: "shahynkamali+1@gmail.com",
    password: "password",
    passwordConfirmation: "password",
  });
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () =>
    setSecureTextEntry(prevState => !prevState);

  const renderEyeIcon = () =>
    secureTextEntry ? (
      <EyeOffIcon color={COLOURS.accent} />
    ) : (
      <EyeIcon color={COLOURS.accent} />
    );

  const handleOnPressLogin = () => navigate("Login");

  const [signUp, { loading }] = useRestaurantSignUpMutation({
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

  const handleOnPressSignUp = async () => {
    const trimmedUser = {
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      restaurantName: user.restaurantName,
      foodhandlersCertificate: user.foodhandlersCertificate.trim(),
      city: user.city,
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

    if (!textRegex.test(trimmedUser.restaurantName)) {
      Toast.show({
        text1:
          "Invalid restaurant name. Only letters, numbers, and spaces are allowed.",
        type: "error",
      });
      return;
    }

    if (!cityRegex.test(trimmedUser.city)) {
      Toast.show({
        text1: "Invalid city name.",
        type: "error",
      });
      return;
    }

    if (!certificateNumberRegex.test(trimmedUser.foodhandlersCertificate)) {
      Toast.show({
        text1: "Invalid food handlers certificate number.",
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

    // signUp({
    //   variables: {
    //     ...trimmedUser,
    //   },
    // });
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
          <Column>
            <Typography weigth="semiBold" type="S">
              Restaurant Name
            </Typography>
            <Input
              keyboardType="default"
              onChangeText={restaurantName =>
                setUser(prev => ({ ...prev, restaurantName }))
              }
              value={user.restaurantName}
              theme="accent"
            />
          </Column>
          <Column>
            <Typography weigth="semiBold" type="S">
              City
            </Typography>
            <Input
              keyboardType="default"
              onChangeText={city => setUser(prev => ({ ...prev, city }))}
              value={user.city}
              theme="accent"
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" type="S">
              Food Handler Certificate Number
            </Typography>
            <Input
              keyboardType="default"
              onChangeText={foodhandlersCertificate =>
                setUser(prev => ({ ...prev, foodhandlersCertificate }))
              }
              value={user.foodhandlersCertificate}
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
      <RestaurantsLocationsModal
        restaurantName={user.restaurantName}
        city={user.city}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </Box>
  );
};

export { RestaurantEmailSignUp };
