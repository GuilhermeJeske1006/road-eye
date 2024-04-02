import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardModal from "./geral/card-modal";
import BtnPrimary from "./geral/btn-primary";

export default function CardDriver(props: {
  openCardDriver: boolean,
  setOpenCardDriver: (isOpen: boolean) => void,
}) {
  return (
    <CardModal fn={props.setOpenCardDriver}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://picsum.photos/id/237/200/300' }}
          style={{ width: 100, height: 100, borderRadius: 100, }}
        ></Image>

        <Text style={[styles.title, { textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }]}>12C2-ABC</Text>
      </View>

      <Text style={styles.title}>Motorista José Maria</Text>
      <Text style={styles.content}>Para SENAI</Text>

      <TouchableOpacity
        style={[styles.button, {
          marginTop: 20, flexDirection: 'row',
          alignItems: 'center',
        }]}
      >
        <Icon name="phone" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          Ligar</Text>
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
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  content: {
    fontSize: 16,
  },

  button: {
    alignItems: "center",
    textAlign: 'center',
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
