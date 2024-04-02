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
import { SearchIcon } from "lucide-react-native";
import { useState, type FC } from "react";
import { View } from "react-native";
import type { Restaurant } from "schema";

interface Props {
  restaurantID: Restaurant["id"];
  route: RouteProp<ParamListBase, "Previous">;
  navigation: any;
}
const RestaurantPreviousOrdersTab: FC<Props> = ({ restaurantID }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // const { data, loading } = useRestaurantOrdersQuery({
  //   variables: {
  //     id: restaurantID,
  //   },
  // });

  // const [findOrder, { data }] = useLazyRestaurantOrderQuery();

  // const renderNothingFound = useMemo(
  //   () => (
  //     <Box>
  //       <Columns>
  //         <Column className="items-center">
  //           <Typography weigth="semiBold">No orders found</Typography>
  //         </Column>
  //       </Columns>
  //     </Box>
  //   ),
  //   []
  // );

  // const renderSkeleton = (index: number) => (
  //   <SkeletonRestaurantOrderCard key={index} />
  // );

  // const renderOrders = () =>
  //   loading
  //     ? createList(3).map(renderSkeleton)
  //     : data?.restaurant?.orders?.map(order => (
  //         <RestaurantOrderCard order={order} key={order.id} />
  //       ));

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
              placeholder="123"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <View className="absolute right-0 bottom-0">
              <Button
                theme="accent"
                onPress={handleSearch}
                className="rounded-l-none">
                <SearchIcon color={COLOURS.white} />
              </Button>
            </View>
          </Column>
        </Columns>
      </Box>
      {/* <ScrollView>{renderOrders()}</ScrollView> */}
    </Container>
  );
};

export { RestaurantPreviousOrdersTab };
