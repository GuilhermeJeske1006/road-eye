import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import CameraComponent from "./camera";

export default function ListPeople(props: { onClosePeople: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  const handleCheckClose = () => {
    props.onClosePeople(false);
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

  const setCloseCamera = (closeCamera: boolean) => {
    setSelectedItemSchool(null)
  }


  const dataSchool = [
    { key: "João da silva" },
    { key: "GUILHERME" },
    { key: "Marcos da silva" },
    { key: "KID Bengala" },
    { key: 'Mario do armario'}
  ]

  const renderItemSchool = ({ item }) => (
    <ItemSelected
      item={{
        key: item.key,
        label: item.key,
        image: 'https://www.w3schools.com/w3images/avatar2.png'
      }}
      IconCamera="camera"
      selectedItemGo={selectedItemSchool}
      setSelectedItem={setSelectedItemSchool}

    />
  )


  return (
    
    <ModalComponent handleCheckClose={handleCheckClose}>
      <Text style={styles.titleAdress}>Alunos da rota</Text>

      <FlatList
        data={dataSchool}
        renderItem={renderItemSchool}
        keyExtractor={(item) => item.key}
      />

      <BtnPrimary fn={submit} text="Ir agora" />

      {
        selectedItemSchool && (
          <Modal style={{ flex: 1}}>
          <CameraComponent setOpenCamera={setCloseCamera} people={selectedItemSchool} />
    
          </Modal>
        )
      }

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