import { useNavigation } from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  BottomDrawer,
  Box,
  Button,
  Column,
  Columns,
  Container,
  DatePicker,
  Input,
  TimePicker,
  Typography,
} from "components";
import React, { useState, type FC } from "react";
import { Alert, Platform } from "react-native";
import { RESTAURANT_QUERY } from "screens/RestaurantScreens/RestaurantHomeScreens/RestaurantDashboardScreen/useRestaurantQuery";
import { useActivateMealMutation } from "shared";
import type { RootStackParamList } from "types/navigation.types";
import { RESTAURANT_MEALS_QUERY } from "../RestaurantMeals/useRestaurantMealsQuery";
import { useUpdateRestaurantSetting } from "./useUpdateRestaurantSettingsMutation";

type ActiveRestaurantMealStackProps = NativeStackScreenProps<
  RootStackParamList,
  "ActivateRestaurantMeal"
>;

type Props = ActiveRestaurantMealStackProps;

type RestaurantMealsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantMeals"
>;

type Drawers =
  | "pickupStartTime"
  | "pickupEndTime"
  | "orderCutoffTime"
  | "orderStartTime"
  | "closed";

const ActivateRestaurantMeal: FC<Props> = ({ route }) => {
  const { navigate } = useNavigation<RestaurantMealsNavigationProp>();
  const [activateMeal, { loading: isActivateLoading }] =
    useActivateMealMutation();
  const [updateRestaurantSetting, { loading: isestaurantSettingLoading }] =
    useUpdateRestaurantSetting();
  const { meal, restaurantID } = route?.params;

  const [drawer, setDrawer] = useState<Drawers>("closed");
  const [orderStartTime, setOrderStartTime] = useState(new Date());
  const [orderCutoffTime, setOrderCutoffTime] = useState(
    new Date(new Date().setHours(new Date().getHours() + 2))
  );
  const [pickupStartTime, setPickupStartTime] = useState(
    new Date(new Date().setHours(new Date().getHours() + 4))
  );
  const [pickupEndTime, setPickupEndTime] = useState(
    new Date(new Date().setHours(new Date().getHours() + 6))
  );

  const [quantity, setQuantity] = useState("");

  const minimumDate = {
    orderStartTime: new Date(),
    orderCutoffTime: orderStartTime,
    pickupStartTime: orderCutoffTime,
    pickupEndTime: pickupStartTime,
    closed: new Date(),
  };

  const stateSetters = {
    pickupStartTime: setPickupStartTime,
    pickupEndTime: setPickupEndTime,
    orderStartTime: setOrderStartTime,
    orderCutoffTime: setOrderCutoffTime,
  };

  const times = {
    orderStartTime,
    orderCutoffTime,
    pickupStartTime,
    pickupEndTime,
    closed: new Date(),
  };

  const dateSetters = {
    orderStartTime: [setOrderStartTime, setOrderCutoffTime, setPickupStartTime],
    orderCutoffTime: [setOrderStartTime, setOrderCutoffTime],
    pickupStartTime: [setPickupStartTime, setPickupEndTime],
    pickupEndTime: [setPickupStartTime, setPickupEndTime],
  };

  const updateDateState = (stateName: string, newValue: Date) => {
    setDrawer("closed");
    dateSetters[stateName as keyof typeof stateSetters].forEach(setter =>
      setter(newValue)
    );
  };

  const updateTimeState = (stateName: string, newValue: Date) => {
    setDrawer("closed");
    stateSetters[stateName as keyof typeof stateSetters](newValue);
  };

  const handleDateTimeChange = (date?: Date) => {
    updateTimeState(drawer, date!);
  };

  const areMinimumDatesValid = (): boolean => {
    return (
      orderCutoffTime > orderStartTime &&
      pickupStartTime > orderCutoffTime &&
      pickupEndTime > pickupStartTime
    );
  };

  const handleOnPressActivate = () => {
    if (areMinimumDatesValid()) {
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
                orderCutoffTime: orderCutoffTime.toUTCString(),
                orderStartTime: orderStartTime.toUTCString(),
                pickupStartTime: pickupStartTime.toUTCString(),
                pickupEndTime: pickupEndTime.toUTCString(),
                quantityAvailable: Number(quantity),
              },
            },
            onCompleted: () => navigate("RestaurantMeals", { restaurantID }),
            refetchQueries: [RESTAURANT_MEALS_QUERY, RESTAURANT_QUERY],
          });
        },
      });
    } else {
      Alert.alert(
        "Dates/Times are not valid",
        "Time travelling is not possible"
      );
    }
  };

  const timePicker = (
    <TimePicker
      isClosed={drawer === "closed"}
      minimumDate={minimumDate[drawer]}
      value={times[drawer]}
      onTimeChange={handleDateTimeChange}
    />
  );

  const renderTimePicker = () => {
    if (drawer === "closed") {
      return null;
    }

    return Platform.OS === "ios" ? (
      <BottomDrawer isVisible={true} onClose={() => setDrawer("closed")}>
        {timePicker}
      </BottomDrawer>
    ) : (
      timePicker
    );
  };

  return (
    <Container>
      <Box>
        <Columns>
          <Column columnWidth="half">
            <DatePicker
              disabled
              minimumDate={new Date()}
              name="orderStartTime"
              onChange={updateDateState}
              value={orderStartTime}
            />
          </Column>
          <Column columnWidth="half" direction="column" justifyContent="center">
            <Typography colour="accent" weigth="bold" type="P">
              {meal?.name}
            </Typography>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="half">
            <Typography weigth="bold" type="S">
              Order Start Time:
            </Typography>
            <Button
              theme="accent"
              isOutlined
              onPress={() => setDrawer("orderStartTime")}>
              {orderStartTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
          <Column columnWidth="half">
            <Typography weigth="bold" type="S">
              Order Cutoff Time:
            </Typography>
            <Button
              theme="accent"
              isOutlined
              onPress={() => setDrawer("orderCutoffTime")}>
              {orderCutoffTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
        </Columns>
        {/* <Columns>
          <Column columnWidth="fullWidth">
            <DatePicker
              disabled
              minimumDate={orderCutoffTime}
              name="pickupStartTime"
              onChange={updateDateState}
              value={pickupStartTime}
            />
          </Column>
        </Columns> */}

        <Columns>
          <Column columnWidth="half">
            <Typography weigth="bold" type="S">
              Pickup Start Time:
            </Typography>
            <Button
              theme="accent"
              isOutlined
              onPress={() => setDrawer("pickupStartTime")}>
              {pickupStartTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
          <Column columnWidth="half">
            <Typography weigth="bold" type="S">
              Pickup Cutoff Time:
            </Typography>
            <Button
              theme="accent"
              isOutlined
              onPress={() => setDrawer("pickupEndTime")}>
              {pickupEndTime.toLocaleTimeString("en-US", {
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
              theme="accent"
              keyboardType="numeric"
              onChangeText={setQuantity}
              value={quantity ?? ""}
            />
          </Column>
          <Column justifyContent="flex-end">
            <Button
              disabled={!quantity}
              isLoading={isestaurantSettingLoading || isActivateLoading}
              onPress={handleOnPressActivate}>
              Activate
            </Button>
          </Column>
        </Columns>
      </Box>

      {renderTimePicker()}
    </Container>
  );
};

export { ActivateRestaurantMeal };
