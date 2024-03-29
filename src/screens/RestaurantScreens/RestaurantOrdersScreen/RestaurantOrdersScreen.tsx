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
import { useEffect, useMemo, useState, type FC } from "react";
import { View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useRestaurantOrdersQuery } from "screens/RestaurantScreens/useRestaurantOrdersQuery";
import type { RootStackParamList } from "types/navigation.types";
import {
  RestaurantOrderCard,
  SkeletonRestaurantOrderCard,
} from "./RestaurantOrderCard";
import { useLazyRestaurantOrderQuery } from "./useLazyRestaurantOrderQuery";

type ActiveOrdersStackProps = NativeStackScreenProps<
  RootStackParamList,
  "RestaurantOrdersScreen"
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

  const renderSkeleton = (index: number) => (
    <SkeletonRestaurantOrderCard key={index} />
  );

  const renderOrders = () =>
    restaurantData?.restaurant?.orders?.map(order => (
      <RestaurantOrderCard order={order} key={order.id} />
    ));

  const handleSearch = () => {};

  return (
    <Container>
      <Box>
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
              <Button
                theme="accent"
                onPress={handleSearch}
                className="rounded-l-none">
                <MagnifyingGlassIcon
                  color={COLOURS.white}
                  className="absolute"
                />
              </Button>
            </View>
          </Column>
        </Columns>
      </Box>
      {renderOrders()}
    </Container>
  );
};

export { RestaurantOrdersScreen };
