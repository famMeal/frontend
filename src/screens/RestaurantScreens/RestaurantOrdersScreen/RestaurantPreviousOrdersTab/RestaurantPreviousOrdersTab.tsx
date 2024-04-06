import type { ParamListBase, RouteProp } from "@react-navigation/native";
import {
  Box,
  Button,
  Column,
  Columns,
  Container,
  Input,
  Typography,
} from "components";
import { COLOURS } from "constants/colours";
import { useDebounce } from "hooks/useDebounce";
import { SearchIcon } from "lucide-react-native";
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
  const [searchTerm, setSearchTerm] = useState("");

  const [searchOrder, { data: orderData, loading: orderLoading }] =
    useLazyRestaurantOrderQuery({
      variables: {
        id: searchTerm,
      },
    });

  const debouncedSearch = useDebounce(searchOrder, 2000);

  const handleSetSearchTerm = (value: string) => {
    setSearchTerm(value);
    if (value.length) {
      debouncedSearch();
    }
  };

  const { data, loading } = useRestaurantOrdersQuery({
    skip: !restaurantID,
    variables: {
      id: restaurantID,
      filters: {
        statusList: [OrderStatusField.Completed],
      },
    },
  });

  console.log(orderData?.order?.restaurant);

  const renderNothingFound = (
    <Box>
      <Columns>
        <Column className="items-center">
          <Typography weigth="semiBold">No orders found</Typography>
        </Column>
      </Columns>
    </Box>
  );

  const renderSkeleton = (index: number) => (
    <SkeletonRestaurantOrderCard key={index} />
  );

  const renderSearchResults = () => {
    if (
      !orderData?.order ||
      orderData?.order?.restaurant?.id !== restaurantID
    ) {
      return renderNothingFound;
    }

    return (
      <RestaurantOrderCard
        order={orderData?.order}
        key={orderData?.order?.id}
      />
    );
  };

  const renderLoadingSkeleton = () =>
    createList(1).map((_, index) => renderSkeleton(index));

  const renderLoadingSkeletons = () =>
    createList(3).map((_, index) => renderSkeleton(index));

  const renderAllOrders = () => {
    return loading
      ? renderLoadingSkeletons()
      : data?.restaurant?.orders?.map(order => (
          <RestaurantOrderCard order={order} key={order.id} />
        ));
  };

  const renderContent = () => {
    if (searchTerm && orderLoading) {
      return renderLoadingSkeleton();
    } else if (searchTerm && orderData) {
      return renderSearchResults();
    }
    return renderAllOrders();
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
              onChangeText={handleSetSearchTerm}
            />
            <View className="absolute right-0 bottom-0">
              <Button theme="accent" className="rounded-l-none">
                <SearchIcon color={COLOURS.white} />
              </Button>
            </View>
          </Column>
        </Columns>
      </Box>
      <Container>
        <ScrollView>{renderContent()}</ScrollView>
      </Container>
    </>
  );
};

export { RestaurantPreviousOrdersTab };
