import { Box, Column, Columns, Container, Skeleton } from "components";
import type { FC } from "react";
import { createList } from "utilities/createList";

const SkeletonRestaurantScreens: FC = () => {
  const renderSkeletons = () =>
    createList(8).map((num: number) => (
      <Box key={num}>
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
    ));
  return <Container>{renderSkeletons()}</Container>;
};

export { SkeletonRestaurantScreens };
