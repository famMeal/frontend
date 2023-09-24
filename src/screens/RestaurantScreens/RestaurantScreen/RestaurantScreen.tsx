import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Column, Columns, Container, Typography } from "components";
import type { FC } from "react";
import type { RootStackParamList } from "types/navigation.types";
import { useRestaurantQuery } from "./useRestaurantQuery";

type Props = NativeStackScreenProps<RootStackParamList, "Restaurant">;

const RestaurantScreen: FC<Props> = ({ route: { params } }) => {
  const { restaurantID } = params;

  const { data } = useRestaurantQuery({
    variables: {
      id: restaurantID,
    },
    skip: !restaurantID,
  });

  return (
    <Container>
      <Columns>
        <Column>
          <Typography weigth="bold" type="H1">
            {data?.restaurant?.name}
          </Typography>
        </Column>
      </Columns>
    </Container>
  );
};

export { RestaurantScreen };
