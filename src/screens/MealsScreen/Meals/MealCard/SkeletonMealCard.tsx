import type { FC } from "react";
import { Image, View } from "react-native";
import { Box, Column, Columns, Skeleton } from "components";

const SkeletonMealCard: FC = () => {
  return (
    <Box>
      <Columns isMarginless>
        <Column className="justify-center" flex="shrink">
          <View className="w-20 h-20 rounded-lg">
            <Skeleton size="large" />
          </View>
        </Column>
        <Column flex="one">
          <Skeleton size="medium" />
          <Skeleton size="small" />
          <Skeleton size="large" />
          <Skeleton size="small" width="full" />
        </Column>
      </Columns>
      <Columns isMarginless>
        <Column>
          <Skeleton size="large" />
        </Column>
        <Column>
          <Skeleton size="large" />
        </Column>
      </Columns>
    </Box>
  );
};

export { SkeletonMealCard };
