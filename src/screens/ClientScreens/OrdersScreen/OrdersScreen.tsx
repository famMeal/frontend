import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Column, Columns, Container } from "components";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { ScrollView } from "react-native";
import type { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";
import { OrderCard, SkeletonOrderCard } from "./OrderCard";
import type { OrderData } from "./useGetUserOrdersQuery";
import { useGetUserOrdersQuery } from "./useGetUserOrdersQuery";

type OrderStackProps = NativeStackScreenProps<RootStackParamList, "Orders">;

interface Props extends OrderStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const OrdersScreen: FC<Props> = ({ route, navigation, setActiveScreen }) => {
  const { userID } = route?.params ?? {};

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);

  const { data, loading } = useGetUserOrdersQuery({
    skip: !userID,
    variables: {
      id: userID,
    },
  });

  const { orders } = data?.user ?? {};

  const renderOrder = (order: OrderData) => (
    <OrderCard key={order.id} order={order} />
  );

  const renderOrders = () => orders?.map(renderOrder);

  const renderSkeleton = (num: number) => <SkeletonOrderCard key={num} />;

  const renderOrderSkeletons = () => createList(3).map(renderSkeleton);

  const renderContent = () =>
    loading ? renderOrderSkeletons() : renderOrders();

  return (
    <Container>
      <Columns>
        <Column columnWidth="fullWidth">
          <ScrollView>{renderContent()}</ScrollView>
        </Column>
      </Columns>
    </Container>
  );
};

export { OrdersScreen };
