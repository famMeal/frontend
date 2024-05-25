import { Button } from "components/Button";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { COLOURS } from "constants/colours";
import { XIcon } from "lucide-react-native";
import type { ReactNode } from "react";
import React, { type FC } from "react";
import {
  Modal as ReactModal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface ModalProps {
  isModalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  isModalVisible,
  setModalVisible,
  children,
}) => {
  return (
    <ReactModal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView} className="mx-4 p-4 mt-12">
          <ScrollView>
            <Columns isMarginless>
              <Column
                isPaddingless
                justifyContent="center"
                alignItems="center"
                columnWidth="fullWidth">
                {children}
              </Column>
            </Columns>
          </ScrollView>
          <View className="top-4 absolute right-4">
            <Button
              isOutlined
              isClean
              isIcon
              theme="accent"
              onPress={() => setModalVisible(false)}>
              <XIcon color={COLOURS.accent} />
            </Button>
          </View>
        </View>
      </View>
    </ReactModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { Modal };
