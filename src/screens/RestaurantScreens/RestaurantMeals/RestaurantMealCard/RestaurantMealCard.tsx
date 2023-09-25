import {
  BottomDrawer,
  Box,
  Button,
  Column,
  Columns,
  Input,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { View } from "react-native";
import { PencilIcon, TrashIcon } from "react-native-heroicons/solid";
import type {
  RestaurantOrdersData,
  RestaurantOrdersVariables,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import {
  RESTAURANT_ORDERS_QUERY,
  type RestaurantMealData,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { useMealDeleteMutation } from "./useMealDeleteMutation";
import { useMealUpdateMutation } from "./useMealUpdateMutation";

interface Props {
  meal: RestaurantMealData;
  restaurantID: string;
}

const RestaurantMealCard: FC<Props> = ({
  meal: { name, description, price, id, active },
  restaurantID,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMeal, { loading: isDeleteLoading }] = useMealDeleteMutation();
  const [updateMeal, { loading: isUpdateLoading }] = useMealUpdateMutation();

  const initState = {
    name,
    description,
    price: price.replace("$", "").toString(),
  };

  const [state, setState] = useState(initState);

  const onPressUpdate = () =>
    updateMeal({
      variables: {
        input: {
          name: state.name,
          description: state.description,
          price: Number(state.price),
          mealId: id,
          active,
        },
      },
      onCompleted: toggleEditing,
    });

  const onPressCancel = () => {
    return (onCallbackToggleEdit: () => void) => {
      setState(initState);
      return onCallbackToggleEdit();
    };
  };

  const handleChange = (key: keyof typeof state, value: string) =>
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));

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

  const renderContent = () =>
    isEditing ? (
      <Column isPaddingless flex="one">
        <Columns>
          <Column isPaddingless>
            <Typography weigth="bold" type="S">
              Meal Name
            </Typography>
            <Input
              onChangeText={value => handleChange("name", value)}
              value={state.name}
            />
          </Column>
          <Column isPaddingless flex="shrink">
            <Typography weigth="bold" type="S">
              Price
            </Typography>
            <Input
              onChangeText={value => handleChange("price", value)}
              value={state.price}
            />
          </Column>
        </Columns>
        <Columns>
          <Column isPaddingless>
            <Typography weigth="bold" type="S">
              Description
            </Typography>
            <Input
              onChangeText={value => handleChange("description", value)}
              multiline
              numberOfLines={4}
              maxLength={400}
              value={state.description ?? ""}
            />
          </Column>
        </Columns>
        <Columns className="mt-4">
          <Column isPaddingless>
            <Button
              onPress={() => onPressCancel()(toggleEditing)}
              isOutlined
              theme="accent">
              Cancel
            </Button>
          </Column>
          <Column isPaddingless>
            <Button
              isLoading={isUpdateLoading}
              onPress={onPressUpdate}
              theme="accent">
              Save
            </Button>
          </Column>
        </Columns>
      </Column>
    ) : (
      <Column flex="one">
        <View className="absolute right-2 top-2 z-10">
          <Button onPress={toggleDrawer} isClean isOutlined>
            <TrashIcon color={COLOURS.primary} />
          </Button>
        </View>
        <View className="absolute right-16 top-2 z-10">
          <Button theme="accent" onPress={toggleEditing} isOutlined>
            <PencilIcon color={COLOURS.accent} />
          </Button>
        </View>
        <Typography isMarginless weigth="semiBold" type="P">
          {name}
        </Typography>
        <Typography>{price}</Typography>
        <Typography weigth="semiBold" type="S">
          {description}
        </Typography>
      </Column>
    );

  return (
    <>
      <Box>
        <Columns>{renderContent()}</Columns>
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
            <Button
              isLoading={isDeleteLoading}
              onPress={handleOnDelete}
              theme="accent">
              Delete
            </Button>
          </Column>
        </Columns>
      </BottomDrawer>
    </>
  );
};

export { RestaurantMealCard };
