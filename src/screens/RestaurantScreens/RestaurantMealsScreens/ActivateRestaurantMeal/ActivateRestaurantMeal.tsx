import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";
import {
  BottomDrawer,
  Box,
  Button,
  Column,
  Columns,
  Container,
  DatePicker,
  Input,
  Typography,
} from "components";
import React, { useState, type FC } from "react";
import { Platform } from "react-native";
import { useActivateMealMutation } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { useUpdateRestaurantSetting } from "./useUpdateRestaurantSettingsMutation";

type ActiveRestaurantMealStackProps = NativeStackScreenProps<
  RootStackParamList,
  "ActivateRestaurantMeal"
>;

type Props = ActiveRestaurantMealStackProps;

const form = {
  quantity: "",
  pickupDate: new Date(),
  pickupStartTime: new Date(),
  pickupEndTime: new Date(),
  orderDate: new Date(),
  orderStartTime: new Date(),
  orderCutoffTime: new Date(),
};

type Keys = keyof typeof form;

type RestaurantMealsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantMeals"
>;

const ActivateRestaurantMeal: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<RestaurantMealsNavigationProp>();
  const [activateMeal, { loading: isActivateLoading }] =
    useActivateMealMutation();
  const [updateRestaurantSetting, { loading: isestaurantSettingLoading }] =
    useUpdateRestaurantSetting();
  const { meal, restaurantID } = route?.params;
  const [state, setState] = useState(form);

  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const {
    quantity: unused,
    pickupDate: unusedPickupedDate,
    orderDate: unusedOrderDate,
    ...times
  } = state;
  type Time = keyof typeof times;
  const [drawer, setDrawer] = useState<Time>("orderStartTime");

  const handleChange = (name: Keys | string, value: string | Date) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  const minimumDate = {
    orderStartTime: new Date(),
    orderCutoffTime: state.orderStartTime,
    pickupStartTime: state.orderCutoffTime,
    pickupEndTime: state.pickupStartTime,
  };

  const toggleDrawerState = () => setDrawerVisible(prev => !prev);

  const handleOpenDrawer = (drawer: Time) => {
    setDrawer(drawer);
    toggleDrawerState();
  };

  const handleDateTimeChange = (
    _: DateTimePickerEvent,
    date?: Date | undefined,
  ) => {
    const currentDate = date || state[drawer];
    handleChange(drawer, currentDate);
  };

  const handleOnPressActivate = () =>
    activateMeal({
      variables: {
        input: {
          mealId: meal?.id,
          active: true,
        },
      },
      onCompleted: () => {
        updateRestaurantSetting({
          variables: {
            input: {
              restaurantId: restaurantID,
              orderCutoffTime: state.orderCutoffTime.toUTCString(),
              orderStartTime: state.orderStartTime.toUTCString(),
              pickupEndTime: state.pickupEndTime.toUTCString(),
              pickupStartTime: state.orderStartTime.toUTCString(),
              quantityAvailable: Number(state.quantity),
            },
          },
          onCompleted: () => navigate("RestaurantMeals", { restaurantID }),
        });
      },
    });

  return (
    <Container>
      <Typography
        colour="accent"
        className="text-center mt-4"
        weigth="bold"
        type="H3">
        {meal?.name}
      </Typography>
      <Box>
        <Columns>
          <Column alignItems="center" justifyContent="center">
            <Typography weigth="bold" type="S">
              Order Date
            </Typography>
            <DatePicker
              name="orderDate"
              onChange={handleChange}
              value={state.pickupDate}
            />
          </Column>
          <Column alignItems="center">
            <Typography weigth="bold" type="S">
              Between
            </Typography>
            <Button onPress={() => handleOpenDrawer("orderStartTime")}>
              {state.orderStartTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
            <Button
              className="mt-4"
              onPress={() => handleOpenDrawer("orderCutoffTime")}>
              {state.orderCutoffTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
        </Columns>
        <Columns>
          <Column alignItems="center" justifyContent="center">
            <Typography weigth="bold" type="S">
              Pickup Date
            </Typography>
            <DatePicker
              name="pickupDate"
              onChange={handleChange}
              value={state.pickupDate}
            />
          </Column>
          <Column alignItems="center">
            <Typography weigth="bold" type="S">
              Between
            </Typography>
            <Button onPress={() => handleOpenDrawer("pickupStartTime")}>
              {state.pickupStartTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
            <Button
              className="mt-4"
              onPress={() => handleOpenDrawer("pickupEndTime")}>
              {state.pickupEndTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Typography weigth="bold" type="S">
              Quantity:
            </Typography>
            <Input
              keyboardType="numeric"
              onChangeText={value => handleChange("quantity", value)}
              value={state.quantity ?? ""}
            />
          </Column>
          <Column justifyContent="flex-end">
            <Button
              isLoading={isestaurantSettingLoading || isActivateLoading}
              onPress={handleOnPressActivate}
              theme="accent">
              Activate
            </Button>
          </Column>
        </Columns>
      </Box>
      <BottomDrawer
        isVisible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}>
        <DateTimePicker
          minimumDate={minimumDate[drawer]}
          value={times[drawer]}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateTimeChange}
        />
      </BottomDrawer>
    </Container>
  );
};

export { ActivateRestaurantMeal };
