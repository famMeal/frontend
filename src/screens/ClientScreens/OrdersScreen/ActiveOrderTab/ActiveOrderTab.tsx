import type { ParamListBase, RouteProp } from "@react-navigation/native";
import { Container } from "components";
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

  const parseDateString = (dateString: string) => {
    const isoString = dateString.replace(" UTC", "Z");
    return new Date(isoString);
  };

  // Filter and sort orders
  const filteredAndSortedOrders = data?.user?.orders
    ?.filter(({ status }) => status !== STATUS.COMPLETED)
    .sort((a, b) => {
      return (
        parseDateString(b.createdAt!).getTime() -
        parseDateString(a.createdAt!).getTime()
      );
    });

  const renderOrders = () =>
    filteredAndSortedOrders?.map(({ id, ...rest }) => (
      <OrderCard key={id} order={{ id, ...rest }} />
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
