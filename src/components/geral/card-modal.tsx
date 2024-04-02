import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CardModal(props: {
    fn: (isOpen: boolean) => void,
    children: React.ReactNode
}) {
  return (
    <View style={styles.card} >
      <TouchableOpacity onPress={() => { props.fn(false) }} style={{ alignItems: 'flex-end' }} >
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>
        {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    width: '80%',
    position: 'absolute',
    bottom: 20,
    zIndex: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

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
