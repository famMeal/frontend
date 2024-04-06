import type { ParamListBase, RouteProp } from "@react-navigation/native";
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
import {
  RestaurantOrderCard,
  SkeletonRestaurantOrderCard,
} from "../RestaurantOrderCard";
import { useRestaurantOrdersQuery } from "./useRestaurantOrdersQuery";

interface Props {
  restaurantID: Restaurant["id"];
  route: RouteProp<ParamListBase, "Active">;
  navigation: any;
}

const RestaurantActiveOrdersTab: FC<Props> = ({ restaurantID }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [searchOrder, { data: orderData, loading: orderLoading }] =
    useLazyRestaurantOrderQuery({
      variables: {
        id: searchTerm,
      },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    });

  const debouncedSearch = useDebounce(searchOrder, 1000);

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
        statusList: [
          OrderStatusField.Preparing,
          OrderStatusField.Ready,
          OrderStatusField.PickedUp,
        ],
      },
    },
  });

  const renderNothingFound = (
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

export { RestaurantActiveOrdersTab };
