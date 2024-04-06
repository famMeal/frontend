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
import { COLOURS } from "constants/colours";
import { InfoIcon } from "lucide-react-native";
import React, { useState, type FC } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Tooltip from "react-native-walkthrough-tooltip";
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
            onCompleted: () => {
              Toast.show({
                type: "accent",
                text1: "Meal Activated!",
              });
              navigate("RestaurantMeals", { restaurantID });
            },
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

  const [toolTipThatsVisible, setToolTipThatsVisibile] =
    useState<keyof typeof tooltipContents>("closed");

  const isToolTipOpen = (tooltipKey: keyof typeof tooltipContents) =>
    toolTipThatsVisible === tooltipKey;

  const tooltipContents = {
    orderStartTime: "Start Time for users to reserve orders",
    orderCutoffTime: "Cutoff Time for users to reserve orders",
    pickupStartTime: "Start Time for users to pick up their orders",
    pickupEndTime: "End Time for users to pick up their orders",
    closed: null,
  } as const;

  const renderToolTip = (tooltip: keyof typeof tooltipContents) => (
    <Tooltip
      arrowStyle={{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 20,
        borderStyle: "solid",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderTopColor: "white",
      }}
      tooltipStyle={{
        backgroundColor: "white",
        borderRadius: 5,
        maxWidth: 200,
        marginTop: -15,
      }}
      onClose={() => setToolTipThatsVisibile("closed")}
      isVisible={isToolTipOpen(tooltip)}
      content={
        <Typography weigth="bold" type="S">
          {tooltipContents[tooltip]}
        </Typography>
      }
      placement="top">
      <TouchableOpacity
        className="ml-1"
        onPress={() => setToolTipThatsVisibile(tooltip)}>
        <InfoIcon color={COLOURS.accent} />
      </TouchableOpacity>
    </Tooltip>
  );

  return (
    <Container>
      <Box>
        <Columns>
          <Column columnWidth="half">
            <Typography weigth="bold" type="S">
              Meal
            </Typography>
            <Typography className="mt-2" type="P">
              {meal?.name}
            </Typography>
          </Column>
          <Column columnWidth="half">
            <Typography weigth="bold" type="S">
              Order Date:
            </Typography>
            <DatePicker
              disabled
              minimumDate={new Date()}
              name="orderStartTime"
              onChange={updateDateState}
              value={orderStartTime}
            />
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="half" direction="row">
            <Typography weigth="bold" type="S">
              Order Start:
            </Typography>
            {renderToolTip("orderStartTime")}
          </Column>
          <Column columnWidth="half" direction="row">
            <Typography weigth="bold" type="S">
              Order End:
            </Typography>
            {renderToolTip("orderCutoffTime")}
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="half">
            <Button onPress={() => setDrawer("orderStartTime")}>
              {orderStartTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
          <Column columnWidth="half">
            <Button onPress={() => setDrawer("orderCutoffTime")}>
              {orderCutoffTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="half" direction="row">
            <Typography weigth="bold" type="S">
              Pickup Start:
            </Typography>
            {renderToolTip("pickupStartTime")}
          </Column>
          <Column columnWidth="half" direction="row">
            <Typography weigth="bold" type="S">
              Pickup End:
            </Typography>
            {renderToolTip("pickupEndTime")}
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
            <Button onPress={() => setDrawer("pickupStartTime")}>
              {pickupStartTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
          <Column columnWidth="half">
            <Button onPress={() => setDrawer("pickupEndTime")}>
              {pickupEndTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Button>
          </Column>
        </Columns>
        <Columns>
          <Column columnWidth="fullWidth">
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
        </Columns>
        <Columns className="mt-4">
          <Column columnWidth="fullWidth">
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
