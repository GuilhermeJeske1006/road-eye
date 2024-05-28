import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from 'react-native-virtualized-view'

export default function ModalComponent(props: {
  handleCheckClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.adressContainer}>
      <TouchableOpacity onPress={props.handleCheckClose} style={styles.cloneModal}>
        <Ionicons name="remove-outline" size={50} />
      </TouchableOpacity>

      {/* <ScrollView contentContainerStyle={styles.scrollViewContent} nestedScrollEnabled> */}
        {props.children}
      {/* </ScrollView> */}
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
    // maxHeight: '100%', 
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cloneModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
