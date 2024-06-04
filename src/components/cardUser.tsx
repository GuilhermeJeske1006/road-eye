import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardModal from "./geral/card-modal";
import BtnPrimary from "./geral/btn-primary";

export default function CardUser(props: {
  openCardUser: boolean;
  setOpenCardUser: (isOpen: boolean) => void;
  setUserSelect: any;
}) {
  const makePhoneCall = (phoneNumber) => {
    let phoneNumberString = "";

    if (Platform.OS === "android") {
      phoneNumberString = `tel:${phoneNumber}`;
    } else {
      phoneNumberString = `telprompt:${phoneNumber}`;
    }

    Linking.canOpenURL(phoneNumberString)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Phone number is not available");
        } else {
          return Linking.openURL(phoneNumberString);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <CardModal fn={props.setOpenCardUser}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "column"}}>
          <Text style={[styles.title]}>{props.setUserSelect.username}</Text>
          <Text style={[styles.content]}>
            Para o {props.setUserSelect.school}{" "}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
        onPress={() => makePhoneCall(props.setUserSelect.phone)}
      >
        <Icon name="phone" size={20} color="#fff" />
        <Text style={styles.buttonText}>Ligar</Text>
      </TouchableOpacity>
    </CardModal>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 10,
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  content: {
    fontSize: 16,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  button: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#BC1C2C",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
});
