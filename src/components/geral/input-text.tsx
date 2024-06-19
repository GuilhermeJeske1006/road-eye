import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Certifique-se de instalar e configurar a biblioteca de ícones

export function InputText(props: {
  setFn: (text: string) => void;
  placeholder: string;
  attribute?: any; // Tornando attribute opcional
  value?: string;
}) {
  const { setFn, placeholder, attribute, value } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(attribute?.secureTextEntry || false);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        {...attribute}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => setFn(text)}
      />
      {attribute?.secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
          <Icon name={secureTextEntry ? "visibility" : "visibility-off"} size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 10,
    height: 55,
    margin: 5,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: "sans-serif",
    fontSize: 15,
    padding: 15,
  },
  iconContainer: {
    padding: 10,
  },
});
