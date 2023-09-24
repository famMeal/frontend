import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import type { Dispatch } from "react";
import React, { useState, type FC } from "react";
import { Alert, Platform, View } from "react-native";
import { ClockIcon } from "react-native-heroicons/solid";
import type { RootStackParamList } from "types/navigation.types";
import {
  RESTAURANT_ORDERS_QUERY,
  type RestaurantOrdersData,
  type RestaurantOrdersVariables,
} from "../useRestaurantOrdersQuery";
import { useMealCreateMutation } from "./useMealCreateMutation";

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

type Props = NativeStackScreenProps<RootStackParamList, "CreateMeal">;

const CreateMealScreen: FC<Props> = ({ route: { params } }) => {
  const { restaurantID } = params;

  const [state, setState] = useState(form);
  const [time, setTime] = useState<TypeOfTimes>("pickupStartTime");
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [pickupStartTime, setPickupStartTime] = useState(new Date());
  const [pickupEndTime, setPickupEndTime] = useState(new Date());
  const [orderCutoffTime, setOrderCutoffTime] = useState(new Date());
  const [orderStartTime, setOrderStartTime] = useState(new Date());
  const [createMeal, { loading }] = useMealCreateMutation();

  const setTimes = {
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

  type TypeOfTimes = keyof typeof setTimes;

  const onTimeChange = (
    _: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => (selectedDate ? setTimes[time](selectedDate) : null);

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

  const clearState = () =>
    setState({
      name: "",
      description: "",
      price: "",
      quantityAvailable: "",
    });

  const showMealCreatedAlert = () => {
    Alert.alert(
      "Meal Created",
      "Your meal has been successfully created!",
      [{ text: "Close", onPress: clearState }],
      { cancelable: false },
    );
  };

  const handleCreateMeal = () =>
    createMeal({
      variables: {
        input: {
          name: state.name,
          description: state.description,
          price: Number(state.price),
          restaurantId: restaurantID,
        },
      },
      update: (cache, result) => {
        const data = cache.readQuery<
          RestaurantOrdersData,
          RestaurantOrdersVariables
        >({
          query: RESTAURANT_ORDERS_QUERY,
          variables: {
            id: restaurantID,
          },
        });

        if (data && result?.data?.mealCreate?.meal) {
          cache.writeQuery<RestaurantOrdersData, RestaurantOrdersVariables>({
            query: RESTAURANT_ORDERS_QUERY,
            variables: {
              id: restaurantID,
            },
            data: {
              ...data,
              restaurant: {
                ...data?.restaurant,
                meals: [
                  ...data?.restaurant?.meals,
                  result?.data?.mealCreate?.meal,
                ],
              },
            },
          });
        }
      },
      onCompleted: () => showMealCreatedAlert(),
    });

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
                  value={state.name}
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
                  value={state.description}
                  multiline
                  numberOfLines={4}
                  maxLength={400}
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
                  value={state.quantityAvailable}
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
                  value={state.price}
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
                <Button
                  onPress={handleCreateMeal}
                  isLoading={loading}
                  theme="accent">
                  Create
                </Button>
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
