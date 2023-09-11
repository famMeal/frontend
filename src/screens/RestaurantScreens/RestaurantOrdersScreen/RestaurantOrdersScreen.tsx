import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { useCallback, useMemo, useState, type FC } from "react";
import { View } from "react-native";
import { MagnifyingGlassIcon, TrashIcon } from "react-native-heroicons/solid";
import type { OrderData } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";
import {
  RestaurantOrderCard,
  SkeletonRestaurantOrderCard,
} from "./RestaurantOrderCard";
import {
  RestaurantOrderData,
  useLazyRestaurantOrderQuery,
} from "./useLazyRestaurantOrderQuery";

type Props = NativeStackScreenProps<RootStackParamList, "RestaurantOrders">;

const RestaurantOrdersScreen: FC<Props> = ({ route: { params } }) => {
  const [isSearching, setIsSearching] = useState(false);
  const { orders, restaurantID } = params;
  const [searchTerm, setSearchTerm] = useState("");
  const [findOrder, { data, loading }] = useLazyRestaurantOrderQuery();

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
  };

  const renderNothingFound = useMemo(
    () => (
      <Box>
        <Columns>
          <Column className="items-center">
            <Typography weigth="semiBold">No orders found</Typography>
          </Column>
        </Columns>
      </Box>
    ),
    [],
  );

  const renderSearchOrder = (data: RestaurantOrderData) =>
    data?.order && doesOrderBelongToRestaurant(data)
      ? renderOrder(data?.order)
      : renderNothingFound;

  const renderOrder = (order: OrderData) => (
    <RestaurantOrderCard key={order?.id} order={order} />
  );

  const renderOrders = () => orders?.map(renderOrder);

  const renderSkeleton = (index: number) => (
    <SkeletonRestaurantOrderCard key={index} />
  );

  const renderSkeletons = useCallback(
    () => createList(2).map(renderSkeleton),
    [],
  );

  const doesOrderBelongToRestaurant = (data?: RestaurantOrderData) =>
    data?.order?.meal?.restaurant?.id === restaurantID;

  const renderContent = () =>
    loading
      ? renderSkeletons()
      : !!data && isSearching
      ? renderSearchOrder(data)
      : renderOrders();

  const handleSearch = () => {
    findOrder({
      variables: {
        id: searchTerm,
      },
      onCompleted: () => setIsSearching(true),
    });
  };

  const renderDeleteSearchButton = () =>
    isSearching ? (
      <View className="absolute top-0 right-0">
        <Button theme="accent" isOutlined onPress={handleClearSearch}>
          <TrashIcon color={COLOURS.accent} />
        </Button>
      </View>
    ) : null;
  return (
    <Container>
      <Columns isMarginless>
        <Column>
          <Box>
            <Typography
              isMarginless
              className="text-center"
              weigth="bold"
              type="H3">
              Today's orders
            </Typography>
          </Box>
          <Box>
            <Columns>
              <Column isPaddingless>
                <Typography weigth="bold" type="S">
                  Search by ID
                </Typography>
                <View>
                  <Input
                    theme="accent"
                    editable={!isSearching}
                    placeholder="123"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                  />
                  {renderDeleteSearchButton()}
                </View>
              </Column>
              <Column isPaddingless flex="shrink" className="justify-end">
                <Button
                  theme="accent"
                  disabled={!searchTerm}
                  onPress={handleSearch}>
                  <MagnifyingGlassIcon color={COLOURS.white} />
                </Button>
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
