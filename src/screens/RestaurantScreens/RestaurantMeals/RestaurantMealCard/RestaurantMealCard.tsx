import { Box, Button, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { Switch, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";
import type {
  RestaurantOrdersData,
  RestaurantOrdersVariables,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import {
  RESTAURANT_ORDERS_QUERY,
  type RestaurantMealData,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { ActionBottomDrawer } from "screens/components";
import { UpdateRestaurantMeal } from "./UpdateRestaurantMeal";
import { useMealUpdateMutation } from "./UpdateRestaurantMeal/useMealUpdateMutation";
import { useMealDeleteMutation } from "./useMealDeleteMutation";

interface Props {
  meal: RestaurantMealData;
  restaurantID: string;
}

const RestaurantMealCard: FC<Props> = ({ meal, restaurantID }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMeal, { loading: isDeleteLoading }] = useMealDeleteMutation();
  const [updateMeal] = useMealUpdateMutation();

  const { name, description, price, id, active } = meal;

  const toggleEditing = () => setIsEditing(prev => !prev);
  const toggleDrawer = () => setIsVisible(prev => !prev);

  const handleOnDelete = () =>
    deleteMeal({
      variables: {
        input: {
          mealId: id,
        },
      },
      onCompleted: toggleDrawer,
      update: cache => {
        const data = cache.readQuery<
          RestaurantOrdersData,
          RestaurantOrdersVariables
        >({
          query: RESTAURANT_ORDERS_QUERY,
          variables: {
            id: restaurantID,
          },
        });

        if (data?.restaurant?.meals) {
          cache.writeQuery<RestaurantOrdersData, RestaurantOrdersVariables>({
            query: RESTAURANT_ORDERS_QUERY,
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

  const toggleSwitch = () => {
    updateMeal({
      variables: {
        input: {
          name: name,
          description: description,
          price: Number(price.replace("$", "")),
          mealId: id,
          active: !active,
        },
      },
    });
  };

  const renderContent = () =>
    isEditing ? (
      <UpdateRestaurantMeal
        meal={meal}
        toggleEditing={toggleEditing}
        restaurantID={restaurantID}
      />
    ) : (
      <Column flex="one">
        <View className="absolute right-0 top-2 z-10">
          <Button onPress={toggleDrawer} isClean isOutlined>
            <TrashIcon color={COLOURS.primary} />
          </Button>
        </View>

        <Typography isMarginless weigth="semiBold" type="P">
          {name}
        </Typography>
        <Typography>{price}</Typography>
        <Typography weigth="semiBold" type="S">
          {description}
        </Typography>
        <Columns isMarginless>
          <Column isPaddingless className="justify-end">
            <Button theme="accent" onPress={toggleEditing} isOutlined>
              Edit
            </Button>
          </Column>
          <Column isPaddingless className="items-end">
            <Typography weigth="bold" type="S">
              Active
            </Typography>
            <Switch
              trackColor={{ false: COLOURS.white, true: COLOURS.accent }}
              thumbColor={COLOURS.white}
              ios_backgroundColor={COLOURS.light}
              onValueChange={toggleSwitch}
              value={active}
            />
          </Column>
        </Columns>
      </Column>
    );

  return (
    <>
      <Box>
        <Columns>{renderContent()}</Columns>
      </Box>
      <ActionBottomDrawer
        onPress={handleOnDelete}
        onClose={toggleDrawer}
        isVisible={isVisible}
        isLoading={isDeleteLoading}>
        <Typography weigth="semiBold">Are you sure?</Typography>
        <Typography type="S">
          Deleting this meal will remove it for ever
        </Typography>
      </ActionBottomDrawer>
    </>
  );
};

export { RestaurantMealCard };
