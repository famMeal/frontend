import { Box, Column, Columns, Skeleton } from "components";
import { type FC } from "react";

const SkeletonRestaurantOrderCard: FC = () => {
  return (
    <Box>
      <Columns>
        <Column isPaddingless>
          <Skeleton size="large" />
          <Skeleton size="medium" />
        </Column>
      </Columns>
      <Columns>
        <Column isPaddingless>
          <Skeleton size="medium" />
        </Column>
      </Columns>
      <Columns>
        <Column isPaddingless>
          <Skeleton size="large" />
        </Column>
      </Columns>
      <Columns>
        <Column isPaddingless>
          <Skeleton size="small" />
          <Skeleton size="medium" />
        </Column>
        <Column isPaddingless className="items-end">
          <Skeleton size="medium" />
          <Skeleton size="small" />
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonRestaurantOrderCard };
