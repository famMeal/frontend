import { useNavigation } from "@react-navigation/native";
import { Box, Button, Column, Columns, Input, Typography } from "components";
import { COLOURS } from "constants/colours";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useEffect, useState, type FC } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import type { SignUpNavigationProps } from "types/navigation.types";
import { RestaurantsLocationsModal } from "./RestaurantLocationsModal";
import type { RestaurantLocation } from "./RestaurantLocationsModal/useRestaurantLocations";
import { useRestaurantSignUpMutation } from "./useRestaurantSignUpMutation";

const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const textRegex = /^[A-Za-z0-9\s'’-]+$/;
const cityRegex = /^[A-Za-z\s\-']{1,50}$/;

const provinces = {
  ON: "Ontario",
} as const;

type Province = keyof typeof provinces;

const RestaurantEmailSignUp: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { navigate } = useNavigation<SignUpNavigationProps>();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    restaurantName: "",
    city: "Toronto",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    return () =>
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        city: "",
        restaurantName: "",
      });
  }, []);

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
  const trimmedUser = {
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    restaurantName: user.restaurantName,
    city: user.city,
    email: user.email.trim(),
    password: user.password.trim(),
    passwordConfirmation: user.passwordConfirmation.trim(),
  };

  const handleOnPressValidate = async () => {
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

    if (!emailRegex.test(trimmedUser.email)) {
      Toast.show({
        text1: "Invalid email address.",
        type: "error",
      });
      return;
    }

    if (trimmedUser.password.length < 6) {
      Toast.show({
        text1: "Password must be at least 6 characters long.",
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
    setIsModalOpen(true);
  };

  const handleSignUp = (location: RestaurantLocation | undefined) => {
    const { lat, lng, name, address } = location ?? {};
    const [street, city, postalCode, unusedCountry] = address?.split(",") ?? "";
    const [unusedEmpty, province, firstPartPostalCode, secondPartPostalCode] =
      postalCode.split(" ");

    signUp({
      variables: {
        ...trimmedUser,
        latitude: String(lat),
        longitude: String(lng),
        restaurantName: name,
        addressLine1: street,
        city: city,
        postalCode: `${firstPartPostalCode}${secondPartPostalCode}`,
        province: provinces[province as Province],
      },
    });
  };

  return (
    <Box>
      <ScrollView>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography type="S">
              To sign up, we only require your full name, email and a password
              and restaurant information. For now we are only accepting
              restaurants in Toronto
            </Typography>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Typography weigth="semiBold" type="S">
              First Name
            </Typography>
            <Input
              readOnly={loading}
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
              readOnly={loading}
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
              readOnly={loading}
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
              Email
            </Typography>
            <Input
              readOnly={loading}
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
              readOnly={loading}
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
              readOnly={loading}
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
            <Button isLoading={loading} onPress={handleOnPressValidate}>
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
        onSucces={handleSignUp}
        restaurantName={user.restaurantName}
        city={user.city}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </Box>
  );
};

export { RestaurantEmailSignUp };
