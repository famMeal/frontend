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
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState, type FC } from "react";
import { Alert } from "react-native";
import type { RootStackParamList } from "types/navigation.types";
import {
  RESTAURANT_MEALS_QUERY,
  RestaurantMealsQueryData,
  RestaurantMealsQueryVariables,
} from "../RestaurantMealsScreens/RestaurantMeals/useRestaurantMealsQuery";
import { useMealCreateMutation } from "./useMealCreateMutation";

const form = {
  name: "",
  description: "",
  price: "",
  quantityAvailable: "",
};

type FormValues = keyof typeof form;

type CreateMealStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantCreateMealScreen"
>;

interface Props extends CreateMealStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantCreateMealScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const [state, setState] = useState(form);

  const [createMeal, { loading }] = useMealCreateMutation();

  const handleInputChange = (name: FormValues, value: string) =>
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));

  const clearState = () => {
    setState({
      name: "",
      description: "",
      price: "",
      quantityAvailable: "",
    });
    navigation.navigate("RestaurantMealsScreens", { restaurantID });
  };

  const showMealCreatedAlert = () => {
    Alert.alert(
      "Meal Created",
      "Your meal has been successfully created!",
      [{ text: "Close", onPress: clearState }],
      { cancelable: false },
    );
  };

  const handleCreateMeal = () =>
    createMeal({
      variables: {
        input: {
          name: state.name,
          description: state.description,
          price: Number(state.price),
          restaurantId: restaurantID,
        },
      },
      update: (cache, result) => {
        const data = cache.readQuery<
          RestaurantMealsQueryData,
          RestaurantMealsQueryVariables
        >({
          query: RESTAURANT_MEALS_QUERY,
          variables: {
            id: restaurantID,
          },
        });

        if (data && result?.data?.mealCreate?.meal) {
          cache.writeQuery<
            RestaurantMealsQueryData,
            RestaurantMealsQueryVariables
          >({
            query: RESTAURANT_MEALS_QUERY,
            variables: {
              id: restaurantID,
            },
            data: {
              ...data,
              restaurant: {
                ...data?.restaurant,
                meals: [
                  ...data?.restaurant?.meals,
                  result?.data?.mealCreate?.meal,
                ],
              },
            },
          });
        }
      },
      onCompleted: showMealCreatedAlert,
    });

  const isFormValid =
    !!state.description?.length && !!state.name.length && !!state.price.length;

  return (
    <Container className="flex flex-col justify-between">
      <Typography
        colour="accent"
        className="text-center mt-4"
        weigth="bold"
        type="H3">
        Create Meal
      </Typography>
      <Box>
        <Columns>
          <Column>
            <Typography weigth="bold" type="S">
              Name
            </Typography>
            <Input
              value={state.name}
              onChangeText={value => handleInputChange("name", value)}
            />
          </Column>
          <Column>
            <Typography weigth="bold" type="S">
              Price
            </Typography>
            <Input
              value={state.price}
              keyboardType="numeric"
              maxLength={3}
              onChangeText={value => handleInputChange("price", value)}
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth" isPaddingless>
            <Typography weigth="bold" type="S">
              Description
            </Typography>
            <Input
              className="max-h-36 h-36"
              value={state.description}
              multiline
              numberOfLines={4}
              maxLength={200}
              onChangeText={value => handleInputChange("description", value)}
            />
          </Column>
        </Columns>
      </Box>
      <Box>
        <Columns isMarginless>
          <Column columnWidth="fullWidth">
            <Button
              disabled={!isFormValid}
              onPress={handleCreateMeal}
              isLoading={loading}
              theme="accent">
              Create
            </Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { RestaurantCreateMealScreen };
