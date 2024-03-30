import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { COLOURS } from "constants/colours";
import { Minus, Plus } from "lucide-react-native";
import type { Dispatch, FC, SetStateAction } from "react";
import { View } from "react-native";

const operations = {
  increment: (quantity: number) => quantity + 1,
  decrement: (quantity: number) => quantity - 1,
};

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}
const QuantitySelector: FC<Props> = ({ quantity, setQuantity }) => {
  const handleQuantityOnPress = (operation: keyof typeof operations) =>
    setQuantity(prevQuantity => operations[operation](prevQuantity));

  return (
    <View className="flex flex-row">
      <View>
        <Button
          className="p-1"
          theme="accent"
          disabled={quantity === 1}
          onPress={() => handleQuantityOnPress("decrement")}
          isFullyRounded>
          <Minus color={COLOURS.white} />
        </Button>
      </View>
      <View className="w-6 flex  items-center justify-center">
        <Typography isMarginless weigth="bold">
          {quantity}
        </Typography>
      </View>
      <View>
        <Button
          className="p-1"
          theme="accent"
          onPress={() => handleQuantityOnPress("increment")}
          isFullyRounded>
          <Plus color={COLOURS.white} />
        </Button>
      </View>
    </View>
  );
};

export { QuantitySelector };
