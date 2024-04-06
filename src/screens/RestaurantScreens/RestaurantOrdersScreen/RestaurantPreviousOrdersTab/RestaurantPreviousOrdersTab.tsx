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
  Input,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { useDebounce } from "hooks/useDebounce";
import { OctagonAlertIcon, SearchIcon } from "lucide-react-native";
import React, { useState, type FC } from "react";
import { ScrollView, View } from "react-native";
import { OrderStatusField, type Restaurant } from "schema";
import { useLazyRestaurantOrderQuery } from "shared/useLazyRestaurantOrderQuery";
import { createList } from "utilities/createList";
import { useRestaurantOrdersQuery } from "../RestaurantActiveOrdersTab/useRestaurantOrdersQuery";
import {
  RestaurantOrderCard,
  SkeletonRestaurantOrderCard,
} from "../RestaurantOrderCard";

interface Props {
  restaurantID: Restaurant["id"];
  route: RouteProp<ParamListBase, "Completed">;
  navigation: any;
}

const RestaurantPreviousOrdersTab: FC<Props> = ({ restaurantID }) => {
  const isActive = useIsFocused();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading } = useRestaurantOrdersQuery({
    skip: !restaurantID || !isActive,
    variables: {
      id: restaurantID,
      filters: {
        statusList: [OrderStatusField.Completed],
      },
    },
  });

  const [searchOrder, { data: searchedOrder, loading: orderLoading, called }] =
    useLazyRestaurantOrderQuery();

  const debouncedHandleSearch = useDebounce((id: string) => {
    if (id.length) {
      searchOrder({
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        variables: { id },
      });
    }
  }, 1000);

  const handleChange = (id: string) => {
    setSearchTerm(id);
    debouncedHandleSearch(id);
  };

  const renderSkeletons = () =>
    createList(3).map((_, index) => (
      <SkeletonRestaurantOrderCard key={index} />
    ));

  const renderNothingFound = () => (
    <Box>
      <Chip position="topRight" icon={null} type="info">
        <OctagonAlertIcon color={COLOURS.white} />
      </Chip>
      <Columns>
        <Column columnWidth="fullWidth">
          <Typography type="H3" weigth="semiBold">
            Nothing found
          </Typography>
          <Typography type="S">No order found with id: {searchTerm}</Typography>
        </Column>
      </Columns>
    </Box>
  );

  const renderContent = () => {
    if (loading || orderLoading || !isActive) {
      return renderSkeletons();
    }

    if (searchTerm && called && !searchedOrder?.order) {
      return renderNothingFound();
    }

    if (
      searchTerm &&
      searchedOrder?.order &&
      searchedOrder?.order?.restaurant?.id === restaurantID
    ) {
      return <RestaurantOrderCard order={searchedOrder.order} />;
    }

    return data?.restaurant?.orders?.length
      ? data.restaurant.orders.map(order => (
          <RestaurantOrderCard order={order} key={order.id} />
        ))
      : renderNothingFound();
  };

  return (
    <>
      <Box>
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="bold" type="S">
              Search by ID
            </Typography>
            <Input
              theme="accent"
              placeholder="123"
              value={searchTerm}
              onChangeText={handleChange}
            />
          </Column>
          <View className="absolute right-0 bottom-0">
            <Button theme="accent" className="rounded-l-none">
              <SearchIcon color={COLOURS.white} />
            </Button>
          </View>
        </Columns>
      </Box>
      <Container>
        <ScrollView>{renderContent()}</ScrollView>
      </Container>
    </>
  );
};

export { RestaurantPreviousOrdersTab };
