import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { Chip, Column, Columns, Container } from "components";
import { STATUS } from "constants/status";
import type { FC } from "react";
import React from "react";
import { ScrollView } from "react-native";
import type { User } from "schema";
import {
  OrderCard,
  SkeletonOrderCard,
} from "screens/ClientScreens/OrdersScreen/OrderCard";
import { createList } from "utilities/createList";
import type { OrderData } from "./useGetUserOrdersQuery";
import { useGetUserOrdersQuery } from "./useGetUserOrdersQuery";

interface Props {
  userID: User["id"];
  route: RouteProp<ParamListBase, "Active">;
  navigation: any;
}

export const groupAndSortOrders = (
  orders: OrderData[],
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
    {},
  );

  if (groupedOrders) {
    Object.keys(groupedOrders)?.forEach(dateKey => {
      groupedOrders[dateKey].sort(
        (a, b) =>
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime(),
      );
    });
  }

  return groupedOrders ?? {};
};

export const toReadableDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const ActiveOrderTab: FC<Props> = ({ userID }) => {
  const { data, loading } = useGetUserOrdersQuery({
    skip: !userID,
    variables: {
      id: userID,
    },
  });

  const renderSkeleton = (num: number) => <SkeletonOrderCard key={num} />;

  const renderOrderSkeletons = () => createList(3).map(renderSkeleton);

  const orders = data?.user?.orders?.filter(
    ({ status }) => status !== STATUS.PICKED_UP,
  );

  const groupedOrders = groupAndSortOrders(orders!);

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

export { ActiveOrderTab };
