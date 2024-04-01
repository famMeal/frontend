import { useNavigation } from "@react-navigation/native";
import { Button, Typography } from "components";
import { COLOURS } from "constants/colours";
import { ArrowLeftCircleIcon } from "lucide-react-native";
import { memo, type FC } from "react";
import { View } from "react-native";
import type { User } from "schema";
import type { MainNavigationProps } from "types/navigation.types";
import { getCSS } from "./MainHeader.styles";

interface Props {
  title: string;
  userID: User["id"];
}

const MainHeader: FC<Props> = memo(({ title, userID }) => {
  const { container, wrapper } = getCSS();
  const navigation = useNavigation<MainNavigationProps>();

  return (
    <View className={container}>
      <View className={wrapper}>
        <Button
          onPress={() => navigation.navigate("Meals", { userID })}
          isClean
          isOutlined
          isFullyRounded>
          <ArrowLeftCircleIcon color={COLOURS.accent} size={30} />
        </Button>
      </View>
      <Typography type="H3" weigth="bold" colour="accent">
        {title}
      </Typography>
    </View>
  );
});
export { MainHeader };
