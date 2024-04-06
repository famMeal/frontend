import { Button, Column, Columns, Input, Modal, Typography } from "components";
import React, { useState, type FC } from "react";
import Toast from "react-native-toast-message";
import type { Restaurant } from "schema";
import { RESTAURANT_QUERY } from "../RestaurantHomeScreens/RestaurantDashboardScreen/useRestaurantQuery";
import type {
  RestaurantMealsQueryData,
  RestaurantMealsQueryVariables,
} from "../RestaurantMealsScreens/RestaurantMeals/useRestaurantMealsQuery";
import { RESTAURANT_MEALS_QUERY } from "../RestaurantMealsScreens/RestaurantMeals/useRestaurantMealsQuery";
import { useMealCreateMutation } from "./useMealCreateMutation";

const form = {
  name: "",
  description: "",
  price: "",
  quantityAvailable: "",
};

type FormValues = keyof typeof form;

interface Props {
  restaurantID: Restaurant["id"];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const RestaurantCreateMealModal: FC<Props> = ({
  restaurantID,
  isOpen,
  setIsOpen,
}) => {
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
  };

  const showMealCreatedAlert = () => {
    Toast.show({
      type: "accent",
      text1: "New meal added!",
    });
    clearState();
    setIsOpen(false);
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
      refetchQueries: [RESTAURANT_QUERY],
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
    <Modal isModalVisible={isOpen} setModalVisible={setIsOpen}>
      <Columns>
        <Column>
          <Typography colour="accent" className=" mt-4" weigth="bold" type="H3">
            Create Meal
          </Typography>
        </Column>
      </Columns>
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
    </Modal>
  );
};

export { RestaurantCreateMealModal };
