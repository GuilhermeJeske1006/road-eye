import { watchPositionAsync } from "expo-location";
import { Component, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";

export default function ForgotScreen(props: {
  openForgot: boolean;
  onCloseForgot: (openForgot: boolean) => void;
  email: string;
}) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    emailRequired: "",
  } as any);

  function submitForgot() {
    if (email === "") {
      setErrors({ emailRequired: "Por favor, preencha o campo email" });
      return;
    } else {
      console.log(email);
    }
  }
  return (
    <KeyboardAvoidingView behavior="padding">
      <TouchableOpacity
        onPress={() => props.onCloseForgot(false)}
        style={{ alignItems: "flex-start" }}
      >
        <Icon name="close" size={20} color="#000" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/logo.png")}
        style={[styles.image, { marginBottom: 40 }]}
      ></Image>
      {errors.emailRequired && (
        <Text style={{ color: "red" }}>{errors.emailRequired}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity
        onPress={submitForgot}
        style={[styles.button, { marginTop: 30 }]}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    marginBottom: 10,
    height: 55,
    margin: 5,
    paddingLeft: 20,
    fontFamily: "sans-serif",
    fontSize: 15,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#BC1C2C",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
