import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Chip, Column, Columns, Typography } from "components";
import { COLOURS } from "constants/colours";
import { useState, type FC } from "react";
import { Alert, View } from "react-native";
import { TrashIcon } from "react-native-heroicons/solid";

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
    if (hasActiveMeal) {
      Alert.alert("You can only have 1 active meal at the time");
    } else {
      navigate("ActivateRestaurantMeal", { meal, restaurantID });
    }
  };

  const handleOnPressDeactivate = () =>
    deactivateMeal({
      variables: {
        input: {
          mealId: meal?.id,
          active: false,
        },
      },
    });

  const renderCTA = () =>
    active ? (
      <Button isLoading={loading} onPress={handleOnPressDeactivate}>
        Deactivate
      </Button>
    ) : (
      <Button onPress={handleOnPressActivate}>Activate</Button>
    );

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
          <Column columnWidth="twoThird">
            <View>
              <Chip isStatic type={active ? "success" : "primary"}>
                {active ? "Active" : "Disabled"}
              </Chip>
            </View>
          </Column>
          <Column
            columnWidth="oneThird"
            alignItems="flex-end"
            justifyContent="flex-end"
          />
        </Columns>
        <View className="absolute top-4 right-4">
          <Button isClean isOutlined disabled={active} onPress={toggleDrawer}>
            <TrashIcon
              size={22}
              color={active ? COLOURS.white : COLOURS.primary}
            />
          </Button>
        </View>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography type="S" weigth="semiBold" isMarginless>
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
