import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  BottomDrawer,
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import React, { Dispatch, useState, type FC } from "react";
import { Platform, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/solid";

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const form = {
  name: "",
  description: "",
  price: "",
  quantityAvailable: "",
};

type FormValues = keyof typeof form;

const CreateMealScreen: FC = () => {
  const [state, setState] = useState(form);
  const [time, setTime] = useState<TypeOfTimes>("pickupStartTime");
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [pickupStartTime, setPickupStartTime] = useState(new Date());
  const [pickupEndTime, setPickupEndTime] = useState(new Date());
  const [orderCutoffTime, setOrderCutoffTime] = useState(new Date());
  const [orderStartTime, setOrderStartTime] = useState(new Date());

  const times = {
    pickupStartTime: setPickupStartTime,
    pickupEndTime: setPickupEndTime,
    orderCutoffTime: setOrderCutoffTime,
    orderStartTime: setOrderStartTime,
  } as const;

  const selectedTimes = {
    pickupStartTime,
    pickupEndTime,
    orderCutoffTime,
    orderStartTime,
  };

  type TypeOfTimes = keyof typeof times;

  const onTimeChange = (
    _: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => (selectedDate ? times[time](selectedDate) : null);

  const handleOpenTimeDrawer = (time: TypeOfTimes) => {
    return (onCallBackOpenDrawer: Dispatch<React.SetStateAction<boolean>>) => {
      setTime(time);
      onCallBackOpenDrawer(true);
    };
  };

  const handleInputChange = (name: FormValues, value: string) =>
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));

  return (
    <Container>
      <Columns>
        <Column>
          <Box>
            <Typography className="text-center" weigth="bold" type="H3">
              Create Meal
            </Typography>
          </Box>
          <Box>
            <Columns>
              <Column isPaddingless>
                <Typography weigth="bold" type="S">
                  Meal Name
                </Typography>
                <Input
                  onChangeText={value => handleInputChange("name", value)}
                />
              </Column>
            </Columns>
            <Columns>
              <Column isPaddingless>
                <Typography weigth="bold" type="S">
                  Description
                </Typography>
                <Input
                  multiline
                  numberOfLines={4}
                  onChangeText={value =>
                    handleInputChange("description", value)
                  }
                />
              </Column>
            </Columns>
            <Columns>
              <Column isPaddingless>
                <Typography weigth="bold" type="S">
                  Quantity
                </Typography>
                <Input
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={value =>
                    handleInputChange("quantityAvailable", value)
                  }
                />
              </Column>
              <Column isPaddingless>
                <Typography weigth="bold" type="S">
                  Price
                </Typography>
                <Input
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={value => handleInputChange("price", value)}
                />
              </Column>
            </Columns>
            <Columns>
              <Column flex="one" isPaddingless className="relative">
                <Typography weigth="bold" type="S">
                  Start Pickup time
                </Typography>
                <View>
                  <Input editable={false} value={formatTime(pickupStartTime)} />
                  <View className="absolute right-0">
                    <Button
                      onPress={() =>
                        handleOpenTimeDrawer("pickupStartTime")(
                          setDrawerVisible,
                        )
                      }>
                      <ClockIcon color={COLOURS.white} />
                    </Button>
                  </View>
                </View>
              </Column>
              <Column flex="one" isPaddingless>
                <Typography weigth="bold" type="S">
                  End Pickup time
                </Typography>
                <View>
                  <Input editable={false} value={formatTime(pickupEndTime)} />
                  <View className="absolute right-0">
                    <Button
                      onPress={() =>
                        handleOpenTimeDrawer("pickupEndTime")(setDrawerVisible)
                      }>
                      <ClockIcon color={COLOURS.white} />
                    </Button>
                  </View>
                </View>
              </Column>
            </Columns>
            <Columns>
              <Column isPaddingless className="relative">
                <Typography weigth="bold" type="S">
                  Start Order time
                </Typography>
                <View>
                  <Input editable={false} value={formatTime(orderStartTime)} />
                  <View className="absolute right-0">
                    <Button
                      onPress={() =>
                        handleOpenTimeDrawer("orderStartTime")(setDrawerVisible)
                      }>
                      <ClockIcon color={COLOURS.white} />
                    </Button>
                  </View>
                </View>
              </Column>
              <Column isPaddingless>
                <Typography weigth="bold" type="S">
                  Order Cutoff time
                </Typography>
                <View>
                  <Input editable={false} value={formatTime(orderCutoffTime)} />
                  <View className="absolute right-0">
                    <Button
                      onPress={() =>
                        handleOpenTimeDrawer("orderCutoffTime")(
                          setDrawerVisible,
                        )
                      }>
                      <ClockIcon color={COLOURS.white} />
                    </Button>
                  </View>
                </View>
              </Column>
            </Columns>
          </Box>
          <Box>
            <Columns>
              <Column isPaddingless>
                <Button theme="accent">Create</Button>
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
      <BottomDrawer
        isVisible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}>
        <DateTimePicker
          minimumDate={pickupStartTime}
          value={selectedTimes[time]}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      </BottomDrawer>
    </Container>
  );
};

export { CreateMealScreen };
