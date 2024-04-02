import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { Chip, Column, Columns, Container } from "components";
import type { FC } from "react";
import React from "react";
import { ScrollView } from "react-native";
import { OrderStatusField, type User } from "schema";

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

const PreviousOrdersTab: FC<Props> = ({ userID }) => {
  const { data, loading } = useGetUserOrdersQuery({
    skip: !userID,
    variables: {
      id: userID,
      filters: {
        status: OrderStatusField.Completed,
      },
    },
  });

  const renderSkeleton = (num: number) => <SkeletonOrderCard key={num} />;

  const renderOrderSkeletons = () => createList(3).map(renderSkeleton);

  const groupedOrders = groupAndSortOrders(data?.user?.orders!);

  const renderOrders = () =>
    Object.entries(groupedOrders).map(([date, ordersForDate]) => (
      <Columns direction="column" key={date}>
        <Column columnWidth="fullWidth" justifyContent="center">
          <Chip type="accent" className="mb-4" isStatic>
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
    loading ? renderOrderSkeletons() : renderOrders();

  return (
    <Container>
      <ScrollView>{renderContent()}</ScrollView>
    </Container>
  );
};

export { PreviousOrdersTab };
