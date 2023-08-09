import { useNavigation } from "@react-navigation/native";
import { Button, Typography } from "components";
import { memo, type FC } from "react";
import { View } from "react-native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import type { MainNavigationProps } from "types/navigation.types";
import { getCSS } from "./MainHeader.styles";

interface Props {
  title: string;
}

const MainHeader: FC<Props> = memo(({ title }) => {
  const { container, wrapper } = getCSS();
  const navigation = useNavigation<MainNavigationProps>();

  return (
    <View className={container}>
      <View className={wrapper}>
        <Button
          onPress={() => navigation.navigate("Meals")}
          theme="accent"
          isFullyRounded>
          <ArrowLeftCircleIcon color="white" size={30} />
        </Button>
      </View>
      <Typography type="H3" weigth="bold" className="text-white">
        {title}
      </Typography>
    </View>
  );
});
export { MainHeader };