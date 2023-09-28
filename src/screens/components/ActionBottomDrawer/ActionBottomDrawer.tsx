import { BottomDrawer, Button, Column, Columns } from "components";
import type { BottomDrawerProps } from "components/BottomDrawer";
import type { FC, PropsWithChildren } from "react";
import type { TouchableOpacityProps } from "react-native";

interface Props
  extends BottomDrawerProps,
    PropsWithChildren,
    Pick<TouchableOpacityProps, "onPress"> {
  isLoading: boolean;
}

const ActionBottomDrawer: FC<Props> = ({
  isVisible,
  onClose,
  children,
  onPress,
  isLoading,
}) => {
  return (
    <BottomDrawer isVisible={isVisible} onClose={onClose}>
      <Columns isMarginless>
        <Column isPaddingless>{children}</Column>
      </Columns>
      <Columns>
        <Column className="pr-0">
          <Button onPress={onClose} theme="accent" isOutlined>
            Cancel
          </Button>
        </Column>
        <Column className="pl-0">
          <Button isLoading={isLoading} onPress={onPress} theme="accent">
            Delete
          </Button>
        </Column>
      </Columns>
    </BottomDrawer>
  );
};

export { ActionBottomDrawer };
