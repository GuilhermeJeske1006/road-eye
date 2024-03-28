import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";

export default function ListSchool(props: { onCloseSchool: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  const handleCheckClose = () => {
    props.onCloseSchool(false);
    setOpenCheck(false);

  }

  const submit = () => {
    if (selectedItemGo === null || selectedItemSchool === null) {
      return;
    }
    console.log(selectedItemGo, selectedItemSchool);
    props.setLocal(selectedItemSchool);
    handleCheckClose();
  }


  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);


  const dataSchool = [
    { key: "Escola S" },
    { key: "SENAI" },
    { key: "E.B.M Anna othilia" },
  ]

  const renderItemSchool = ({ item }) => (
    <ItemSelected
      item={{
        key: item.key,
        label: item.key

      }}
      selectedItemGo={selectedItemSchool}
      setSelectedItem={setSelectedItemSchool}
      icon="school"
      icon2="school"
    />
  )


  return (
    <ModalComponent handleCheckClose={handleCheckClose}>
      <Text style={styles.titleAdress}>Selecione a sua escola</Text>

      <FlatList
        data={dataSchool}
        renderItem={renderItemSchool}
        keyExtractor={(item) => item.key}
      />

      <BtnPrimary fn={submit} text="Ir agora" />
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});