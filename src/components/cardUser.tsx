import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CardModal from "./geral/card-modal";
import BtnPrimary from "./geral/btn-primary";

export default function CardUser(props: {
  openCardUser: boolean,
  setOpenCardUser: (isOpen: boolean) => void,
  setUserSelect: object
}) {
  return (
    <CardModal fn={props.setOpenCardUser}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://picsum.photos/id/237/200/300' }}
          style={{ width: 100, height: 100, borderRadius: 100, }}
        ></Image>
        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
          <Text style={[styles.title]}>José Maria</Text>
          <Text style={[styles.content]}>Para o SENAI</Text>
        </View>
      </View>

      
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
    textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10
  },
  content: {
    fontSize: 16,
    textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10
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
