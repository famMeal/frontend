import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Column,
  Columns,
  QuantitySelector,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import type { Dispatch, FC, SetStateAction } from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ChevronDownIcon, TrashIcon } from "react-native-heroicons/solid";
import type { MealSplinter } from "screens/ClientScreens/MealsScreen/MealScreen/useGetMealQuery";
import type { ConfirmationNavigationProps } from "types/navigation.types";
import { createTimeArray, formatTimeIntervals } from "utilities";

interface Props {
  userID: string;
  quantity: number;
  setQuantity: Dispatch<React.SetStateAction<number>>;
  meal?: Omit<MealSplinter, "restaurant">;
  setSelectedTime: Dispatch<SetStateAction<string[]>>;
}

const RestaurantMealCard: FC<Props> = ({
  userID,
  quantity,
  setQuantity,
  meal,
  setSelectedTime,
}) => {
  const { name, description, pickupEndTime, pickupStartTime } = meal ?? {};

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

  const handleOnPressDelete = () => navigate("Meals", { userID });

  return (
    <Box className="relative">
      <View className="absolute right-4 top-4 z-10">
        <Button onPress={handleOnPressDelete} isOutlined isClean>
          <TrashIcon color={COLOURS.primary} />
        </Button>
      </View>
      <Columns className="mt-4">
        <Column columnWidth="fullWidth">
          <Typography isMarginless weigth="bold" type="H3">
            {name}
          </Typography>
          <Typography isMarginless type="S">
            {description}
          </Typography>
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column columnWidth="twoThird">
          <Typography type="S" weigth="bold" colour="accent">
            Pickup window
          </Typography>
          <SelectList
            arrowicon={<ChevronDownIcon size={22} color={COLOURS.accent} />}
            inputStyles={{
              color: COLOURS.accent,
              width: "90%",
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
        <Column
          columnWidth="oneThird"
          alignItems="center"
          justifyContent="center">
          <Typography className="mb-4" type="S" weigth="bold" colour="accent">
            Quantity
          </Typography>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </Column>
      </Columns>
    </Box>
  );
};

export { RestaurantMealCard };
