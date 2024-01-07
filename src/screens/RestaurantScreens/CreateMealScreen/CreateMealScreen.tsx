import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import type { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState, type FC } from "react";
import { Alert } from "react-native";
import {
  RESTAURANT_ORDERS_QUERY,
  type RestaurantOrdersData,
  type RestaurantOrdersVariables,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import type { RootStackParamList } from "types/navigation.types";
import { useMealCreateMutation } from "./useMealCreateMutation";

const form = {
  name: "",
  description: "",
  price: "",
  quantityAvailable: "",
};

type FormValues = keyof typeof form;

type CreateMealStackProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateMeal"
>;

interface Props extends CreateMealStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const CreateMealScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

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
      onCompleted: showMealCreatedAlert,
    });

  return (
    <Container className="flex flex-col justify-between">
      <Typography
        colour="accent"
        className="text-center mt-4"
        weigth="bold"
        type="H3">
        Create Meal
      </Typography>
      <Box className="mt-4">
        <Columns>
          <Column>
            <Typography weigth="bold" type="S">
              Name
            </Typography>
            <Input
              value={state.name}
              onChangeText={value => handleInputChange("name", value)}
            />
          </Column>
          <Column>
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
          <Column columnWidth="fullWidth" isPaddingless>
            <Typography weigth="bold" type="S">
              Description
            </Typography>
            <Input
              className="max-h-36 h-36"
              value={state.description}
              multiline
              numberOfLines={4}
              maxLength={200}
              onChangeText={value => handleInputChange("description", value)}
            />
          </Column>
        </Columns>
        <Columns>
          {/* <Column isPaddingless>
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
            </Column> */}
        </Columns>
        {/* <Columns>
          <Column>
            <Typography weigth="bold" type="S">
              Start Pickup time
            </Typography>
            <View className="w-full">
              <Input
                editable={false}
                value={formatTimeFromUTC(pickupStartTime)}
              />
              <View className="absolute right-0">
                <Button
                  onPress={() =>
                    handleOpenTimeDrawer("pickupStartTime")(setDrawerVisible)
                  }>
                  <ClockIcon color={COLOURS.white} />
                </Button>
              </View>
            </View>
          </Column>
          <Column>
            <Typography weigth="bold" type="S">
              End Pickup time
            </Typography>
            <View className="w-full">
              <Input
                editable={false}
                value={formatTimeFromUTC(pickupEndTime)}
              />
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
        </Columns> */}
        {/* <Columns>
          <Column>
            <Typography weigth="bold" type="S">
              Start Order time
            </Typography>
            <View className="w-full">
              <Input
                editable={false}
                value={formatTimeFromUTC(orderStartTime)}
              />
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
          <Column>
            <Typography weigth="bold" type="S">
              Order Cutoff time
            </Typography>
            <View className="w-full">
              <Input
                editable={false}
                value={formatTimeFromUTC(orderCutoffTime)}
              />
              <View className="absolute right-0">
                <Button
                  onPress={() =>
                    handleOpenTimeDrawer("orderCutoffTime")(setDrawerVisible)
                  }>
                  <ClockIcon color={COLOURS.white} />
                </Button>
              </View>
            </View>
          </Column>
        </Columns> */}
      </Box>

      {/* <BottomDrawer
        isVisible={isDrawerVisible}
        onClose={() => setDrawerVisible(false)}>
        <DateTimePicker
          minimumDate={pickupStartTime}
          value={selectedTimes[time]}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      </BottomDrawer> */}

      <Box>
        <Columns isMarginless>
          <Column columnWidth="fullWidth">
            <Button
              onPress={handleCreateMeal}
              isLoading={loading}
              theme="accent">
              Create
            </Button>
          </Column>
        </Columns>
      </Box>
    </Container>
  );
};

export { CreateMealScreen };
