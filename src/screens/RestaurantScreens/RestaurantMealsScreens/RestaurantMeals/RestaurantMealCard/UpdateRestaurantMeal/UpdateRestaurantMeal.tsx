import { Box, Button, Column, Columns, Input, Typography } from "components";
import { useState, type FC } from "react";
import type { RestaurantMealsQueryData } from "../../useRestaurantMealsQuery";
import { useMealUpdateMutation } from "./useMealUpdateMutation";

interface Props {
  meal: RestaurantMealsQueryData["restaurant"]["meals"][number];
  restaurantID: string;
  toggleEditing: () => void;
}

const UpdateRestaurantMeal: FC<Props> = ({
  meal: { name, description, price, id, active, quantityAvailable },
  toggleEditing,
}) => {
  const [updateMeal, { loading: isUpdateLoading }] = useMealUpdateMutation();

  const initState = {
    name,
    description,
    price: price.replace("$", "").toString(),
    quantityAvailable: quantityAvailable?.toString() ?? "0",
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

  return (
    <Box>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography weigth="bold" type="S">
            Name
          </Typography>
          <Input
            onChangeText={value => handleChange("name", value)}
            value={state.name}
          />
        </Column>
      </Columns>
      <Columns>
        <Column columnWidth="fullWidth">
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
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography weigth="bold" isMarginless type="S">
            Price:
          </Typography>
          <Input
            onChangeText={value => handleChange("price", value)}
            value={state.price}
          />
        </Column>
      </Columns>
      <Columns isMarginless className="mt-4">
        <Column>
          <Button
            onPress={() => onPressCancel()(toggleEditing)}
            isOutlined
            theme="accent">
            Cancel
          </Button>
        </Column>
        <Column>
          <Button
            isLoading={isUpdateLoading}
            onPress={onPressUpdate}
            theme="accent">
            Save
          </Button>
        </Column>
      </Columns>
    </Box>
  );
};

export { UpdateRestaurantMeal };
