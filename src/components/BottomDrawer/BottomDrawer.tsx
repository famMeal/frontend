import type { FC, PropsWithChildren } from "react";
import React from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { getCSS } from "./BottomDrawer.styles";

interface Props extends PropsWithChildren {
  isVisible: boolean;
  onClose: () => void;
}

const BottomDrawer: FC<Props> = ({ children, isVisible, onClose }) => {
  const { container, content, overlay } = getCSS();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View className={container}>
        <TouchableOpacity
          className={overlay}
          onPress={onClose}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <View className={content}>{children}</View>
      </View>
    </Modal>
  );
};

export { BottomDrawer };
export type { Props as BottomDrawerProps };
