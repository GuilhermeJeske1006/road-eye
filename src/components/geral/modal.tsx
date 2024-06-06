import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-virtualized-view';

export default function ModalComponent(props: {
  handleCheckClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={true} 
      onRequestClose={props.handleCheckClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={props.handleCheckClose}
      >
        <TouchableOpacity 
          style={styles.addressContainer} 
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <TouchableOpacity onPress={props.handleCheckClose} style={styles.closeModal}>
            <Ionicons name="remove-outline" size={50} />
          </TouchableOpacity>

          <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled>
            {props.children}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  addressContainer: {
    backgroundColor: "#F2F2F2",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '80%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  closeModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleAddress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
