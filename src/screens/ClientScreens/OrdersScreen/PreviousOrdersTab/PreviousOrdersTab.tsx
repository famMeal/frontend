import {
  useIsFocused,
  type ParamListBase,
  type RouteProp,
} from "@react-navigation/native";
import {
  Box,
  Button,
  Chip,
  Column,
  Columns,
  Container,
  Typography,
} from "components";
import type { FC } from "react";
import React from "react";
import { ScrollView } from "react-native";
import { OrderStatusField, type User } from "schema";

import { COLOURS } from "constants/colours";
import { CalendarCheck, SquirrelIcon } from "lucide-react-native";
import {
  OrderCard,
  SkeletonOrderCard,
} from "screens/ClientScreens/OrdersScreen/OrderCard";
import { createList } from "utilities/createList";
import type { UserOrderQueryData } from "../useGetUserOrdersQuery";
import { useGetUserOrdersQuery } from "../useGetUserOrdersQuery";

type OrderData = UserOrderQueryData["user"]["orders"][number];

interface Props {
  userID: User["id"];
  route: RouteProp<ParamListBase, "Previous">;
  navigation: any;
}

export const groupAndSortOrders = (
  orders: OrderData[]
): Record<string, OrderData[]> => {
  const groupedOrders = orders?.reduce(
    (acc: Record<string, OrderData[]>, order: OrderData) => {
      const dateKey = order?.createdAt?.split(" ")[0];
      if (dateKey) {
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(order);
      }
      return acc;
    },
    {}
  );

  if (groupedOrders) {
    Object.keys(groupedOrders)?.forEach(dateKey => {
      groupedOrders[dateKey].sort(
        (a, b) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
    });
    const sortedGroupKeys = Object.keys(groupedOrders)?.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
    const sortedGroupedOrders = sortedGroupKeys?.reduce((acc, key) => {
      acc[key] = groupedOrders[key];
      return acc;
    }, {} as Record<string, OrderData[]>);
    return sortedGroupedOrders;
  }
  return {};
};

export const toReadableDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const PreviousOrdersTab: FC<Props> = ({ userID, navigation }) => {
  const isActive = useIsFocused();

  const { data, loading } = useGetUserOrdersQuery({
    skip: !userID || !isActive,
    variables: {
      id: userID,
      filters: {
        statusList: [OrderStatusField.Completed],
      },
    },
  });

  const renderSkeleton = (num: number) => <SkeletonOrderCard key={num} />;

  const renderOrderSkeletons = () => createList(3).map(renderSkeleton);

  const groupedOrders = groupAndSortOrders(data?.user?.orders!);

  const onPressNavigateToMeals = () => {
    navigation.navigate("Meals", { userID });
  };

  const renderNoOrdersCTA = () => (
    <Box>
      <Columns isMarginless direction="column">
        <Column
          columnWidth="fullWidth"
          justifyContent="center"
          alignItems="center">
          <Typography type="H3" weigth="bold">
            No orders yet
          </Typography>
        </Column>
        <Column
          columnWidth="fullWidth"
          justifyContent="center"
          alignItems="center">
          <SquirrelIcon color={COLOURS.primary} size={30} />
        </Column>
        <Column
          columnWidth="fullWidth"
          justifyContent="center"
          alignItems="center">
          <Button onPress={onPressNavigateToMeals} className="mt-8">
            View Meals
          </Button>
        </Column>
      </Columns>
    </Box>
  );

  const renderOrders = () =>
    !data?.user?.orders?.length
      ? renderNoOrdersCTA()
      : Object.entries(groupedOrders).map(([date, ordersForDate]) => (
          <Columns direction="column" key={date}>
            <Column columnWidth="fullWidth" justifyContent="center">
              <Chip
                type="info"
                className="mb-4"
                isStatic
                icon={<CalendarCheck className="text-white mr-2" />}>
                {toReadableDate(date)}
              </Chip>
            </Column>
            <Column columnWidth="fullWidth">
              {ordersForDate.map(({ id, ...rest }) => (
                <OrderCard key={id} order={{ id, ...rest }} />
              ))}
            </Column>
          </Columns>
        ));

  const renderContent = () =>
    loading || !data ? renderOrderSkeletons() : renderOrders();

  return (
    <Container>
      <ScrollView>{renderContent()}</ScrollView>
    </Container>
  );
};

export { PreviousOrdersTab };
