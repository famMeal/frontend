import AsyncStorage from "@react-native-async-storage/async-storage";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { View } from "react-native";
import type { RootStackParamList } from "types/navigation.types";
import { useLogoutMutation } from "./useLogoutMutation";
import { useRestaurantQuery } from "./useRestaurantQuery";

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "Restaurant"
>;

interface Props extends RestaurantStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID } = params;
  const [logout, { loading }] = useLogoutMutation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const { data } = useRestaurantQuery({
    variables: {
      id: restaurantID,
    },
    skip: !restaurantID,
  });

  const handleOnPressLogOut = () => {
    logout({
      onCompleted: async () => {
        try {
          await AsyncStorage.removeItem("credentials");
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
      onError: error => {
        console.error("Logout error:", error);
      },
    });
  };

  return (
    <Container className="m-4">
      <View className="absolute right-2">
        <Button isLoading={loading} onPress={handleOnPressLogOut}>
          Logout
        </Button>
      </View>
      <Typography
        colour="accent"
        weigth="bold"
        type="H3"
        className="text-center mt-4">
        {data?.restaurant?.name}
      </Typography>
      <Columns>
        <Column columnWidth="fullWidth">
          <Box>
            <Typography>
              You have {data?.restaurant?.orders?.length} orders
            </Typography>
            <Button>Create new Meal</Button>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { RestaurantScreen };
