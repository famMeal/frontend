import type { FC, Dispatch, SetStateAction } from "react";
import type { ConfirmationNavigationProps } from "types/navigation.types";
import { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { View } from "react-native";
import { ChevronDownIcon, TrashIcon } from "react-native-heroicons/solid";
import {
  Box,
  Column,
  Columns,
  QuantitySelector,
  Typography,
  Button,
} from "components";
import {
  createTimeArray,
  formatCurrency,
  formatTimeIntervals,
} from "utilities";
import { COLOURS } from "constants/colours";
import { useNavigation } from "@react-navigation/native";
import type { MealSplinter } from "screens/MealsScreen/MealScreen/useGetRestaurantMealQuery";

interface Props {
  meal: MealSplinter;
  selectedTime: string[];
  setSelectedTime: Dispatch<SetStateAction<string[]>>;
}

const RestaurantMealCard: FC<Props> = ({
  meal,
  selectedTime,
  setSelectedTime,
}) => {
  const [quantity, setQuantity] = useState(1);

  const { name, description, pickupEndTime, pickupStartTime, price } = meal;

  const { navigate } = useNavigation<ConfirmationNavigationProps>();

  const timeIntervals = createTimeArray(pickupStartTime, pickupEndTime);

  const handleSetSelectedTime = (time: string) => {
    const [selectedPickupStartTime, selectedPickupEndTime] = time?.split("and");
    if (selectedPickupEndTime && selectedPickupStartTime) {
      setSelectedTime([
        selectedPickupStartTime.trim(),
        selectedPickupEndTime.trim(),
      ]);
    }
  };

  const handleOnPressDelete = () => navigate("Meals");

  return (
    <Box className="relative">
      <View className="absolute right-4 top-4 z-10">
        <Button onPress={handleOnPressDelete} isOutlined isClean>
          <TrashIcon color={COLOURS.primary} />
        </Button>
      </View>
      <Columns isMarginless>
        <Column>
          <Typography isMarginless weigth="bold" type="H3">
            {name}
          </Typography>
          <Typography isMarginless type="S">
            {description}
          </Typography>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Typography type="S" weigth="bold" colour="accent">
            Pickup window
          </Typography>
          <SelectList
            defaultOption={{
              key: "option",
              value: formatTimeIntervals(timeIntervals)[0],
            }}
            arrowicon={<ChevronDownIcon size={22} color={COLOURS.accent} />}
            inputStyles={{
              color: COLOURS.accent,
            }}
            dropdownStyles={{
              backgroundColor: COLOURS.accent,
              borderColor: COLOURS.accent,
            }}
            dropdownTextStyles={{
              color: COLOURS.white,
            }}
            boxStyles={{
              borderRadius: 8,
              paddingVertical: 16,
              paddingHorizontal: 8,
              borderColor: COLOURS.accent,
              borderWidth: 2,
            }}
            placeholder="Select time"
            fontFamily="Khula-Bold"
            search={false}
            data={formatTimeIntervals(timeIntervals)}
            setSelected={handleSetSelectedTime}
          />
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </Column>
        <Column className="items-center justify-center">
          <Typography type="S" weigth="bold" colour="accent">
            {formatCurrency(price! * quantity)}
          </Typography>
        </Column>
      </Columns>
    </Box>
  );
};

export { RestaurantMealCard };
