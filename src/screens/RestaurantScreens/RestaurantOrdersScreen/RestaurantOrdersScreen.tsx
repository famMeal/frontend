import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Column, Columns, Container, Input, Typography } from "components";
import { useDebounce } from "hooks";
import { useEffect, useState, type FC } from "react";
import type { OrderData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { RootStackParamList } from "types/navigation.types";
import {
  RestaurantOrderCard,
  SkeletonRestaurantOrderCard,
} from "./RestaurantOrderCard";
import { useLazyRestaurantOrderQuery } from "./useOrderQuery";

type Props = NativeStackScreenProps<RootStackParamList, "RestaurantOrders">;

const RestaurantOrdersScreen: FC<Props> = ({ route: { params } }) => {
  const { orders } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const id = useDebounce<string>(searchTerm, 500);
  const [findOrder, { data, loading }] = useLazyRestaurantOrderQuery();

  useEffect(() => {
    if (id.length) {
      findOrder({
        variables: {
          id,
        },
      });
    }
  }, [id]);

  const renderOrder = (order: OrderData) => (
    <RestaurantOrderCard order={order} />
  );

  const renderOrders = () => orders?.map(renderOrder);

  const renderContent = () => {
    if (loading) return <SkeletonRestaurantOrderCard />;
    return data?.order ? (
      <RestaurantOrderCard order={data?.order} />
    ) : (
      renderOrders()
    );
  };

  return (
    <Container>
      <Columns isMarginless>
        <Column>
          <Box>
            <Typography
              isMarginless
              weigth="bold"
              className="text-center"
              type="H2">
              Today's orders
            </Typography>
            <Columns>
              <Column>
                <Typography weigth="bold" type="S">
                  Search by ID
                </Typography>
                <Input
                  placeholder="38274"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
              </Column>
            </Columns>
          </Box>
        </Column>
      </Columns>
      <Columns>
        <Column>{renderContent()}</Column>
      </Columns>
    </Container>
  );
};

export { RestaurantOrdersScreen };