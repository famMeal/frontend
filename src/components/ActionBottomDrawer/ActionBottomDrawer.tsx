import { BottomDrawer, type BottomDrawerProps } from "components/BottomDrawer";
import { Button } from "components/Button";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
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
      <Columns>
        <Column columnWidth="fullWidth">{children}</Column>
      </Columns>
      <Columns className="mt-4" isMarginless>
        <Column>
          <Button onPress={onClose} theme="accent" isOutlined>
            Cancel
          </Button>
        </Column>
        <Column>
          <Button isLoading={isLoading} onPress={onPress} theme="accent">
            Delete
          </Button>
        </Column>
      </Columns>
    </BottomDrawer>
  );
};

export { ActionBottomDrawer };
