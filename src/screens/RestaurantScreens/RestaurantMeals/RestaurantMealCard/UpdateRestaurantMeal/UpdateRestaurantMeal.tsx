import { Button, Column, Columns, Input, Typography } from "components";
import { useState, type FC } from "react";
import { type RestaurantMealData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { useMealUpdateMutation } from "./useMealUpdateMutation";

interface Props {
  meal: RestaurantMealData;
  restaurantID: string;
  toggleEditing: () => void;
}

const UpdateRestaurantMeal: FC<Props> = ({
  meal: { name, description, price, id, active },
  toggleEditing,
}) => {
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
          price: Number(price.replace("$", "")),
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
      <Columns isMarginless className="mt-4">
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
  );
};

export { UpdateRestaurantMeal };
