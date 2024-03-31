import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { Chip, Column, Columns, Container } from "components";
import { STATUS } from "constants/status";
import type { FC } from "react";
import React from "react";
import { ScrollView } from "react-native";
import { type User } from "schema";
import {
  OrderCard,
  SkeletonOrderCard,
} from "screens/ClientScreens/OrdersScreen/OrderCard";
import { createList } from "utilities/createList";
import { groupAndSortOrdersByStatus } from "utilities/groupAndSortOrders";
import { useGetUserOrdersQuery } from "../useGetUserOrdersQuery";

interface Props {
  userID: User["id"];
  route: RouteProp<ParamListBase, "Active">;
  navigation: any;
}

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
    ({ status }) => status !== STATUS.COMPLETED,
  );

  const groupedOrders = groupAndSortOrdersByStatus(orders!);

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
