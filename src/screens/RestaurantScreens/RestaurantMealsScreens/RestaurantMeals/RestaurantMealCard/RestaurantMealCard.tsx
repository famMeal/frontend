import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import React, { useState, type FC } from "react";
import { View } from "react-native";

import { Trash2Icon } from "lucide-react-native";
import Toast from "react-native-toast-message";
import { ActionBottomDrawer } from "screens/components";
import { useActivateMealMutation } from "shared/useActivateMealMutation";
import type { RootStackParamList } from "types/navigation.types";
import type {
  RestaurantMealsQueryData,
  RestaurantMealsQueryVariables,
} from "../useRestaurantMealsQuery";
import { RESTAURANT_MEALS_QUERY } from "../useRestaurantMealsQuery";
import { UpdateRestaurantMeal } from "./UpdateRestaurantMeal";
import { useMealDeleteMutation } from "./useMealDeleteMutation";

interface Props {
  isStripeOnBoardingComplete?: RestaurantMealsQueryData["restaurant"]["stripeOnboardingComplete"];
  meal: RestaurantMealsQueryData["restaurant"]["meals"][number];
  restaurantID: string;
  hasActiveMeal: boolean;
}

type RestaurantMealsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ActivateRestaurantMeal"
>;

const RestaurantMealCard: FC<Props> = ({
  meal,
  restaurantID,
  hasActiveMeal,
  isStripeOnBoardingComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMeal, { loading: isDeleteLoading }] = useMealDeleteMutation();
  const [deactivateMeal, { loading }] = useActivateMealMutation();

  const { navigate } = useNavigation<RestaurantMealsNavigationProp>();

  const { name, description, price, id, active, quantityAvailable } =
    meal ?? {};

  const toggleEditing = () => setIsEditing(prev => !prev);
  const toggleDrawer = () => setIsVisible(prev => !prev);

  const onDeleteComplete = () => {
    toggleDrawer();
    Toast.show({
      type: "primary",
      text1: "Meal removed!",
    });
  };

  const handleOnDelete = () =>
    deleteMeal({
      variables: {
        input: {
          mealId: id,
        },
      },
      onCompleted: onDeleteComplete,
      update: cache => {
        const data = cache.readQuery<
          RestaurantMealsQueryData,
          RestaurantMealsQueryVariables
        >({
          query: RESTAURANT_MEALS_QUERY,
          variables: {
            id: restaurantID,
          },
        });

        if (data?.restaurant?.meals) {
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
                ...data.restaurant,
                meals: data.restaurant.meals.filter(meal => meal.id !== id),
              },
            },
          });
        }
      },
    });

  const handleOnPressActivate = () => {
    if (!isStripeOnBoardingComplete) {
      return Toast.show({
        type: "error",
        text1: "Please setup Stripe before activating meals",
      });
    }

    if (hasActiveMeal) {
      return Toast.show({
        type: "primary",
        text1: "You can only have 1 active meal",
      });
    }

    navigate("ActivateRestaurantMeal", { meal, restaurantID });
  };

  const handleOnPressDeactivate = () =>
    deactivateMeal({
      variables: {
        input: {
          mealId: meal?.id,
          active: false,
        },
      },
      onCompleted: () =>
        Toast.show({
          type: "primary",
          text1: "Meal Deactivated!",
        }),
    });

  const renderCTA = () =>
    active ? (
      <Button isLoading={loading} onPress={handleOnPressDeactivate}>
        Deactivate
      </Button>
    ) : (
      <Button onPress={handleOnPressActivate}>Activate</Button>
    );

  const renderChip = () =>
    active ? (
      <Chip isStatic type="success">
        Active
      </Chip>
    ) : null;

  const renderContent = () =>
    isEditing ? (
      <UpdateRestaurantMeal
        meal={meal}
        toggleEditing={toggleEditing}
        restaurantID={restaurantID}
      />
    ) : (
      <Box>
        <Columns className={active ? "pb-4" : "pb-2"}>
          <Column columnWidth="twoThird">
            <View>{renderChip()}</View>
          </Column>
          <Column
            columnWidth="oneThird"
            alignItems="flex-end"
            justifyContent="flex-end"
          />
        </Columns>
        <View className="absolute top-4 right-4">
          <Button isClean isOutlined disabled={active} onPress={toggleDrawer}>
            <Trash2Icon
              size={22}
              color={active ? COLOURS.white : COLOURS.primary}
            />
          </Button>
        </View>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="semiBold" isMarginless>
              {name}
            </Typography>
            <Typography isMarginless type="S">
              {description}
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column columnWidth="fullWidth">
            <Typography isMarginless type="S">
              Price:{" "}
              <Typography weigth="bold" type="S">
                {price}
              </Typography>
            </Typography>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography isMarginless type="S">
              Quantity:
              <Typography weigth="bold" type="S">
                {" "}
                {quantityAvailable ?? 0} Available
              </Typography>
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Button
              disabled={active}
              theme="accent"
              isOutlined
              onPress={toggleEditing}>
              Edit
            </Button>
          </Column>
          <Column>{renderCTA()}</Column>
        </Columns>
      </Box>
    );

  return (
    <>
      {renderContent()}
      <ActionBottomDrawer
        onPress={handleOnDelete}
        onClose={toggleDrawer}
        isVisible={isVisible}
        isLoading={isDeleteLoading}>
        <Typography isMarginless weigth="bold">
          Are you sure?
        </Typography>
        <Typography type="S">
          Deleting this meal will remove it for ever
        </Typography>
      </ActionBottomDrawer>
    </>
  );
};

export { RestaurantMealCard };
