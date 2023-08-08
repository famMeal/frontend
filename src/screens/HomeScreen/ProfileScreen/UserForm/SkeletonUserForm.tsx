import type { FC } from "react";
import { Box, Column, Columns, Skeleton } from "components";

const SkeletonUserForm: FC = () => {
  return (
    <Box>
      <Columns>
        <Column>
          <Skeleton width="half" size="small" />
          <Skeleton width="full" size="medium" />
        </Column>
        <Column>
          <Skeleton width="half" size="small" />
          <Skeleton width="full" size="medium" />
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Skeleton width="half" size="small" />
          <Skeleton width="full" size="medium" />
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonUserForm };
