import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import { type FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { useRestaurantQuery } from "./useRestaurantQuery";

type RestaurantStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantDashboardScreen"
>;

type RestaurantMealsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantSettingsScreen"
>;

interface Props extends RestaurantStackProps {}

const RestaurantDashboardScreen: FC<Props> = ({ route }) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  const { navigate } = useNavigation<RestaurantMealsNavigationProp>();

  const OnPressNavigateToSettings = () =>
    navigate("RestaurantSettingsScreen", { restaurantID });

  const OnPressNavigateToCreate = () =>
    navigate("CreateMeal", { restaurantID });

  const { data } = useRestaurantQuery({
    variables: {
      id: restaurantID,
    },
    skip: !restaurantID,
  });

  return (
    <Container>
      <Typography
        colour="accent"
        weigth="bold"
        type="H3"
        className="text-center mt-4">
        {data?.restaurant?.name}
      </Typography>

      <Columns>
        <Column>
          <Box>
            <Button onPress={OnPressNavigateToSettings}>settings</Button>
          </Box>
        </Column>
        <Column>
          <Box>
            <Button theme="accent" onPress={OnPressNavigateToCreate}>
              Create Meal
            </Button>
          </Box>
        </Column>
      </Columns>
    </Container>
  );
};

export { RestaurantDashboardScreen };
