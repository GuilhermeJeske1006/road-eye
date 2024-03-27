import React from "react";
import { StyleSheet, Text } from "react-native";

export default function TextError(props: { error?: string }) {
  const { error } = props;

  return (
    <Text style={styles.textError}>{error}</Text>
  );
}

const styles = StyleSheet.create({
  textError: {
    color: 'red',    
  }
});
