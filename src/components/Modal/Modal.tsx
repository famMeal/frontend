import { Button } from "components/Button";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import type { ReactNode } from "react";
import React, { type FC } from "react";
import { Modal as ReactModal, StyleSheet, View } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";

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
          <Columns isMarginless>
            <Column
              isPaddingless
              justifyContent="center"
              alignItems="center"
              columnWidth="fullWidth">
              {children}
            </Column>
          </Columns>
          <View className="top-4 absolute right-4">
            <Button theme="accent" onPress={() => setModalVisible(false)}>
              <XMarkIcon color="white" />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: for a semi-transparent background
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
