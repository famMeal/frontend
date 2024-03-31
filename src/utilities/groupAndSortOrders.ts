import { STATUS } from "constants/status";
import type { UserOrderQueryData } from "screens/ClientScreens/OrdersScreen/useGetUserOrdersQuery";

type OrderData = UserOrderQueryData["user"]["orders"][number];

export const groupAndSortOrdersByStatus = (
  orders: OrderData[],
): Record<string, OrderData[]> => {
  const statusPrecedence = {
    [STATUS.READY]: 1,
    [STATUS.PREPARING]: 2,
    [STATUS.CART]: 3,
    [STATUS.COMPLETED]: 4,
    [STATUS.PICKED_UP]: 5,
  };

  const getStatusRank = (status: STATUS) => statusPrecedence[status] || 99;

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
          getStatusRank(a.status as keyof typeof statusPrecedence) -
          getStatusRank(b.status as keyof typeof statusPrecedence),
      );
    });

    const sortedGroupKeys = Object.keys(groupedOrders)?.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );

    const sortedGroupedOrders = sortedGroupKeys?.reduce((acc, key) => {
      acc[key] = groupedOrders[key];
      return acc;
    }, {} as Record<string, OrderData[]>);

    return sortedGroupedOrders;
  }
  return {};
};
