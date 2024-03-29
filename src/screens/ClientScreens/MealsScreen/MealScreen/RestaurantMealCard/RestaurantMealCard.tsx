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
import { type Dispatch, type FC, type SetStateAction } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ChevronDownIcon, TrashIcon } from "react-native-heroicons/solid";
import type { MealSplinter } from "screens/ClientScreens/MealsScreen/MealScreen/useGetMealQuery";
import type { ConfirmationNavigationProps } from "types/navigation.types";
import { createTimeArray, formatTimeIntervals } from "utilities";

interface Props {
  userID: string;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  meal?: Omit<MealSplinter, "restaurant">;
  setSelectedTime: Dispatch<SetStateAction<string[]>>;
  selectedTime: string[];
  setBasket: Dispatch<SetStateAction<MealSplinter | undefined>>;
}

const formatForDropdown = (timeIntervals: string[]): { value: string }[] => {
  return timeIntervals.map(value => ({
    value,
  }));
};

const RestaurantMealCard: FC<Props> = ({
  userID,
  quantity,
  setQuantity,
  meal,
  setSelectedTime,
  selectedTime,
  setBasket,
}) => {
  const [selectedStartTime, selectedEndTime] = selectedTime;
  const { name, description, pickupEndTime, pickupStartTime } = meal ?? {};
  const { navigate } = useNavigation<ConfirmationNavigationProps>();
  const timeIntervals = createTimeArray(pickupStartTime, pickupEndTime);

  const handleSetSelectedTime = (time: { value: string }) => {
    const [selectedPickupStartTime, selectedPickupEndTime] =
      time.value.split("&");
    if (selectedPickupEndTime && selectedPickupStartTime) {
      setSelectedTime([
        selectedPickupStartTime.trim(),
        selectedPickupEndTime.trim(),
      ]);
    }
  };

  const handleOnPressDelete = () => {
    setBasket(undefined);
    navigate("Meals", { userID });
  };

  if (!meal) {
    return (
      <Box>
        <Typography>No meal in basket</Typography>
        <Columns>
          <Column>
            <Button onPress={() => navigate("Meals", { userID })}>
              Go Back
            </Button>
          </Column>
        </Columns>
      </Box>
    );
  }

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
          <Dropdown<{ value: string }>
            renderRightIcon={() => <ChevronDownIcon color="white" />}
            value={`${selectedStartTime} & ${selectedEndTime}`}
            valueField="value"
            labelField="value"
            placeholder="Select time"
            data={formatForDropdown(formatTimeIntervals(timeIntervals))}
            style={[
              {
                width: "100%",
                backgroundColor: COLOURS.accent,
                borderColor: COLOURS.accent,
                borderRadius: 8,
                borderWidth: 2,
                paddingLeft: 8,
                paddingRight: 8,
              },
            ]}
            placeholderStyle={{
              color: COLOURS.white,
              fontFamily: "Khula-Bold",
              textAlign: "center",
            }}
            selectedTextStyle={{
              color: COLOURS.white,
              fontFamily: "Khula-Bold",
              width: "90%",
              fontSize: 14,
            }}
            onChange={handleSetSelectedTime}
            renderItem={item => (
              <Columns isMarginless className="bg-accent border-b border-white">
                <Column columnWidth="fullWidth">
                  <Typography
                    isMarginless
                    weigth="bold"
                    className="text-white p-1"
                    type="S">
                    {item.value}
                  </Typography>
                </Column>
              </Columns>
            )}
          />
        </Column>
        <Column
          columnWidth="oneThird"
          alignItems="center"
          justifyContent="center">
          <Typography className="mb-2" type="S" weigth="bold" colour="accent">
            Quantity
          </Typography>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </Column>
      </Columns>
    </Box>
  );
};

export { RestaurantMealCard };
