import { Box, Column, Columns, Skeleton } from "components";
import { type FC } from "react";

const SkeletonOrderCard: FC = () => {
  return (
    <Box>
      <Columns>
        <Column className="pb-0">
          <Columns className="-ml-8">
            <Column isPaddingless className="justify-center">
              <Skeleton size="medium" />
              <Skeleton size="large" />
              <Skeleton size="small" />
            </Column>
          </Columns>
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonOrderCard };
