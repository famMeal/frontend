import type { FC } from "react";
import { Box, Column, Columns, Skeleton } from "components";

const SkeletonRestaurantMealCard: FC = () => {
  return (
    <Box className="relative">
      <Columns isMarginless>
        <Column>
          <Skeleton size="medium" />
          <Skeleton size="small" />
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Skeleton size="large" />
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <Skeleton size="small" />
        </Column>
        <Column className="items-center justify-center">
          <Skeleton size="small" />
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonRestaurantMealCard };
