import { Box, Column, Columns, Container, Skeleton } from "components";
import type { FC } from "react";

const SkeletonRestaurantScreens: FC = () => {
  return (
    <Container>
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
    </Container>
  );
};

export { SkeletonRestaurantScreens };
