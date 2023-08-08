import type { FC, Dispatch, SetStateAction } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "types/navigation.types";

import { useEffect } from "react";
import { Columns, Container, Typography, Box, Chip } from "components";

type OrdersStackProps = NativeStackScreenProps<RootStackParamList, "Orders">;

interface Props extends OrdersStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const data = {
  meals: [
    {
      __typename: "Meal",
      confirmationNumber: "26363",
      id: "1",
      status: "reserved",
      date: "2000-01-01 11:00:00 UTC",
      name: "Chicken Alfredo",
      price: 15,
      quantityAvailable: 15,
      restaurant: {
        __typename: "Restaurant",
        name: "The Keg",
      },
    },
    {
      __typename: "Meal",
      confirmationNumber: "26363",
      status: "paid",
      id: "2",
      name: "Steak and Potatoes",
      date: "2000-01-01 11:00:00 UTC",
      price: 20,
      restaurant: {
        __typename: "Restaurant",
        name: "Osteria Il Mulino",
      },
    },
    {
      __typename: "Meal",
      confirmationNumber: "26363",
      status: "paid",
      id: "3",
      name: "Pasta Carbonara",
      date: "2000-01-01 11:00:00 UTC",
      price: 15,
      restaurant: {
        __typename: "Restaurant",
        name: "Osteria Il Mulino",
      },
    },
    {
      __typename: "Meal",
      confirmationNumber: "26363",
      status: "paid",
      id: "4",
      name: "Pad Thai",
      date: "2000-01-01 11:00:00 UTC",
      price: 15,
      restaurant: {
        __typename: "Restaurant",
        name: "Bangkok Garden",
      },
    },
    {
      __typename: "Meal",
      confirmationNumber: "26363",
      status: "paid",
      id: "5",
      name: "Chicken Tikka Masala",
      date: "2000-01-01 11:00:00 UTC",
      price: 15,
      quantityAvailable: 4,
      restaurant: {
        __typename: "Restaurant",
        name: "Bangkok Garden",
      },
    },
  ],
};

const chipTypes = {
  paid: "success",
  reserved: "primary",
};

const OrdersScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveScreen(route.name);
    });
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const renderOrders = () =>
    data?.meals.map(
      ({ confirmationNumber, status, name, date, restaurant }) => (
        <Box className="relative">
          <Typography weigth="semiBold" type="H3">
            {name}
          </Typography>
          <Chip
            type={status === "paid" ? "success" : "primary"}
            position="topRight"
          >
            {status}
          </Chip>
        </Box>
      )
    );

  return (
    <Container>
      <Columns>
        <Typography>orders</Typography>
      </Columns>
    </Container>
  );
};

export { OrdersScreen };
