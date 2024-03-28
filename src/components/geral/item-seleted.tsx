import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ItemSelected(props: {
  item: { key: string; label: string; image?: string }; // Suponho que o item tenha uma chave 'key' e um rótulo 'label'
  selectedItemGo: string;
  setSelectedItem: (item: string) => void;
  IconCamera?: string;
  icon?: string;
  icon2?: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.itemSchool, props.selectedItemGo === props.item.key && styles.selectedItemGo]}
      onPress={() => props.setSelectedItem(props.item.key)}
    >
      <Icon
        name={props.selectedItemGo === props.item.key ? props.icon : props.icon2}
        style={[styles.iconMap, props.selectedItemGo === props.item.key && { color: "#000" }]}
        size={25}
        margin={20}
      />
      {
        props.item.image && (
          <Image
          source={{ uri: props.item.image }}
          style={{ width: 50, height: 50, borderRadius: 100, marginRight: 20}}
        ></Image>
        )
      }
     
      
      <Text style={styles.itemText}>{props.item.label}</Text>

      <Icon
        name={props.IconCamera}
        style={[styles.iconMap, { color: "#000", flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginLeft: 20}]}
        size={25}
        margin={20}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    iconMap: {
      color: "#EDB047",
    },
    itemSchool: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
      fontSize: 25,
      borderRadius: 20,
      marginBottom: 10,
      borderWidth: 1,
    },
    itemText: {
      marginLeft: 1, // Espaço entre o ícone e o texto
      fontSize: 18,
      fontWeight: '400',
    },
    selectedItemGo: {
      backgroundColor: "#EDB047", // Cor de fundo para o item selecionado
    },
  });
