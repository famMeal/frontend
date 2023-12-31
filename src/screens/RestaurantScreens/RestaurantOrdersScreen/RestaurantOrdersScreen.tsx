import type { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { View } from "react-native";
import { MagnifyingGlassIcon, TrashIcon } from "react-native-heroicons/solid";
import {
  useRestaurantOrdersQuery,
  type OrderData,
} from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import type { RootStackParamList } from "types/navigation.types";
import { createList } from "utilities/createList";
import {
  RestaurantOrderCard,
  SkeletonRestaurantOrderCard,
} from "./RestaurantOrderCard";
import type { RestaurantOrderData } from "./useLazyRestaurantOrderQuery";
import { useLazyRestaurantOrderQuery } from "./useLazyRestaurantOrderQuery";

type ActiveOrdersStackProps = NativeStackScreenProps<
  RootStackParamList,
  "ActiveOrders"
>;

interface Props extends ActiveOrdersStackProps {
  setActiveScreen: Dispatch<SetStateAction<string>>;
}

const RestaurantOrdersScreen: FC<Props> = ({
  route,
  navigation,
  setActiveScreen,
}) => {
  const { params } = route ?? {};
  const { restaurantID } = params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () =>
      setActiveScreen(route.name),
    );
    return unsubscribe;
  }, [navigation, setActiveScreen]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: restaurantData } = useRestaurantOrdersQuery({
    variables: {
      id: restaurantID,
    },
  });
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

  const renderOrders = () =>
    restaurantData?.restaurant?.orders?.map(renderOrder);

  const renderSkeleton = (index: number) => (
    <SkeletonRestaurantOrderCard key={index} />
  );

  const renderSkeletons = useCallback(
    () => createList(1).map(renderSkeleton),
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
      <Button theme="accent" isOutlined onPress={handleClearSearch}>
        <TrashIcon color={COLOURS.accent} className="absolute" />
      </Button>
    ) : (
      <Button theme="accent" disabled={!searchTerm} onPress={handleSearch}>
        <MagnifyingGlassIcon color={COLOURS.white} className="absolute" />
      </Button>
    );
  return (
    <Container className="m-4">
      <Typography
        colour="accent"
        isMarginless
        className="text-center mt-4"
        weigth="bold"
        type="H3">
        Today's orders
      </Typography>
      <Box className="mt-4">
        <Columns>
          <Column columnWidth="fullWidth">
            <Typography weigth="bold" type="S">
              Search by ID
            </Typography>
            <Input
              theme="accent"
              editable={!isSearching}
              placeholder="123"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <View className="absolute right-0 bottom-0">
              {renderDeleteSearchButton()}
            </View>
          </Column>
        </Columns>
      </Box>
      {renderContent()}
    </Container>
  );
};

export { RestaurantOrdersScreen };
