import { Box, Column, Columns, Skeleton } from "components";
import type { FC } from "react";

const SkeletonMealCard: FC = () => {
  return (
    <Box>
      <Columns>
        <Column isPaddingless columnWidth="oneThird" justifyContent="center">
          <Box isPaddingLess>
            <Skeleton size="large" width="full" />
            <Skeleton size="large" width="full" />
          </Box>
        </Column>
        <Column isPaddingless columnWidth="twoThird">
          <Box isPaddingLess>
            <Skeleton size="large" />
            <Skeleton size="medium" width="half" />
            <Skeleton size="small" width="half" />
          </Box>
        </Column>
      </Columns>
      <Columns>
        <Column
          isPaddingless
          alignItems="center"
          justifyContent="center"
          columnWidth="oneThird">
          <Box isPaddingLess>
            <Skeleton width="full" size="large" />
          </Box>
        </Column>
        <Column isPaddingless columnWidth="twoThird" alignItems="center">
          <Box isPaddingLess>
            <Skeleton size="large" />
          </Box>
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonMealCard };
