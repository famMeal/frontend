import {
  BottomDrawer,
  Box,
  Button,
  Column,
  Columns,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { View } from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";
import type {
  RestaurantOrdersData,
  RestaurantOrdersVariables,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import {
  RESTAURANT_ORDERS_QUERY,
  type RestaurantMealData,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { useMealDeleteMutation } from "./useMealDeleteMutation";

interface Props {
  meal: RestaurantMealData;
  restaurantID: string;
}

const RestaurantMealCard: FC<Props> = ({
  meal: { name, description, price, id },
  restaurantID,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deleteMeal, { loading }] = useMealDeleteMutation();

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
          const newMeals = data.restaurant.meals.filter(meal => meal.id !== id);

          cache.writeQuery<RestaurantOrdersData, RestaurantOrdersVariables>({
            query: RESTAURANT_ORDERS_QUERY,
            variables: {
              id: restaurantID,
            },
            data: {
              ...data,
              restaurant: {
                ...data.restaurant,
                meals: newMeals,
              },
            },
          });
        }
      },
    });

  return (
    <>
      <Box>
        <View className="absolute right-2 top-2 z-10">
          <Button onPress={toggleDrawer} isClean isOutlined>
            <TrashIcon color={COLOURS.primary} />
          </Button>
        </View>
        <Columns>
          <Column flex="one">
            <Typography isMarginless weigth="semiBold" type="P">
              {name} {price}
            </Typography>
            <Typography weigth="semiBold" type="S">
              {description}
            </Typography>
          </Column>
        </Columns>
      </Box>
      <BottomDrawer isVisible={isVisible} onClose={toggleDrawer}>
        <Columns isMarginless>
          <Column isPaddingless>
            <Typography weigth="semiBold">Are you sure?</Typography>
            <Typography type="S">
              Deleting this meal will remove it for ever
            </Typography>
          </Column>
        </Columns>
        <Columns>
          <Column className="pr-0">
            <Button onPress={toggleDrawer} theme="accent" isOutlined>
              Cancel
            </Button>
          </Column>
          <Column className="pl-0">
            <Button isLoading={loading} onPress={handleOnDelete} theme="accent">
              Delete
            </Button>
          </Column>
        </Columns>
      </BottomDrawer>
    </>
  );
};

export { RestaurantMealCard };
