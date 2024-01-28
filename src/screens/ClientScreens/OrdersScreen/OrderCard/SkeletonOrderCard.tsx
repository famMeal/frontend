import { Box, Column, Columns, Skeleton } from "components";
import { type FC } from "react";

const SkeletonOrderCard: FC = () => {
  return (
    <Box>
      <Columns isMarginless>
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

export { SkeletonOrderCard };
