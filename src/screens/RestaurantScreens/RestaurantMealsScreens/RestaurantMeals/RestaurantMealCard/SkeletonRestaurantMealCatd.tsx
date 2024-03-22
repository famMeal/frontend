import { Box, Column, Columns, Skeleton } from "components";
import type { FC } from "react";

const SkeletonRestaurantMealCard: FC = () => {
  return (
    <Box>
      <Columns>
        <Column columnWidth="fullWidth">
          <Box isPaddingLess>
            <Skeleton size="large" width="full" />
            <Skeleton size="large" width="full" />
          </Box>
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <Box isPaddingLess>
            <Skeleton size="large" width="full" />
          </Box>
        </Column>
        <Column alignItems="flex-end">
          <Box isPaddingLess>
            <Skeleton size="large" width="full" />
          </Box>
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonRestaurantMealCard };
