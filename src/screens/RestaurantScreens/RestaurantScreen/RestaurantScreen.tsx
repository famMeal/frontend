import { Columns, Container, Typography } from "components";
import type { FC } from "react";
import { useGetRestaurantQuery } from "./useGetRestaurantQuery";

const RestaurantScreen: FC = () => {
  const { data, loading } = useGetRestaurantQuery({
    variables: {
      id: "1",
    },
  });

  return (
    <Container>
      <Columns>
        <Typography>{data?.restaurant?.name}</Typography>
      </Columns>
    </Container>
  );
};

export { RestaurantScreen };
