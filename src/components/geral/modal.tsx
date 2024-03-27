import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ModalComponent(props: {
  handleCheckClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.adressContainer}>
      <TouchableOpacity onPress={props.handleCheckClose} style={styles.cloneModal}>
        <Ionicons name="remove-outline" size={50} />
      </TouchableOpacity>

      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  adressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F2F2F2",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cloneModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
