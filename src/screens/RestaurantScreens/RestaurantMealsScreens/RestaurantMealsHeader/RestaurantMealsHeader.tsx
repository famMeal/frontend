import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Typography } from "components";
import { COLOURS } from "constants/colours";
import { memo, type FC } from "react";
import { View } from "react-native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import type { Restaurant } from "schema";
import type { RootStackParamList } from "types/navigation.types";
import { getCSS } from "./RestaurantMealsHeader.styles";

interface Props {
  restaurantID: Restaurant["id"];
}

export type MainNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "RestaurantMeals"
>;

const RestaurantMealsHeader: FC<Props> = memo(({ restaurantID }) => {
  const { container, wrapper } = getCSS();
  const { navigate } = useNavigation<MainNavigationProps>();

  return (
    <View className={container}>
      <View className={wrapper}>
        <Button
          onPress={() => navigate("RestaurantMeals", { restaurantID })}
          isFullyRounded
          isClean
          isOutlined>
          <ArrowLeftCircleIcon color={COLOURS.accent} size={30} />
        </Button>
      </View>
      <Typography type="H3" weigth="bold" colour="accent">
        Activate
      </Typography>
    </View>
  );
});
export { RestaurantMealsHeader };
