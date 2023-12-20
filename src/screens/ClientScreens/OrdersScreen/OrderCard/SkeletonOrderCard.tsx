import { Box, Column, Columns, Skeleton } from "components";
import { type FC } from "react";

const SkeletonOrderCard: FC = () => {
  return (
    <Box>
      <Columns isMarginless>
        <Column columnWidth="fullWidth">
          <Skeleton size="medium" />
          <Skeleton size="large" />
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <Skeleton size="small" />
        </Column>
        <Column alignItems="flex-end">
          <Skeleton size="small" />
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonOrderCard };
