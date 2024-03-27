import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export function InputText(props: {
  setFn: (text: string) => void;
  placeholder: string;
  attribute?: TextInputProps; // Tornando attribute opcional
  value?: string;
}) {
  const { setFn, placeholder, attribute } = props;

  return (
    <TextInput
      style={styles.input}
      {...attribute}
      value={props.value}
      placeholder={placeholder}
      onChangeText={(text) => setFn(text)}
    />
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
});
