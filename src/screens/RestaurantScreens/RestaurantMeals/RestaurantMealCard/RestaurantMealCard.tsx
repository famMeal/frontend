import { Box, Button, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { Switch, View } from "react-native";
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

  const { name, description, price, id, active, quantityAvailable } =
    meal ?? {};

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
      <Box>
        <Columns className="border-b border-accent pb-4">
          <Column>
            <View>
              <Chip isStatic type={active ? "success" : "primary"}>
                {active ? "Active" : "Disabled"}
              </Chip>
            </View>
          </Column>
          <Column alignItems="flex-end" justifyContent="flex-end">
            <Switch
              trackColor={{ false: COLOURS.white, true: COLOURS.accent }}
              thumbColor={COLOURS.white}
              ios_backgroundColor={COLOURS.light}
              onValueChange={toggleSwitch}
              value={active}
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="twoThird">
            <Typography weigth="semiBold" isMarginless>
              {name}
            </Typography>
            <Typography isMarginless type="S">
              {description}
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Typography isMarginless type="S">
              Price:
            </Typography>
          </Column>
          <Column alignItems="flex-end">
            <Typography isMarginless type="S">
              {price}
            </Typography>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Typography isMarginless type="S">
              Quantity:
            </Typography>
          </Column>
          <Column alignItems="flex-end">
            <Typography isMarginless type="S">
              {quantityAvailable ?? 0} Available
            </Typography>
          </Column>
        </Columns>
        <Columns isMarginless>
          <Column>
            <Button theme="accent" onPress={toggleEditing}>
              Edit
            </Button>
          </Column>
          <Column>
            <Button onPress={toggleDrawer}>Delete</Button>
          </Column>
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
