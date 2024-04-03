import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSchool } from "../store/school/thunks";

export default function CheckUser(props: { onCloseCheck: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const schools = useSelector((state: any) => state.SchoolReducer.data);

  const dispatch = useDispatch();

  const handleCheckClose = () => {
    props.onCloseCheck(false);
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

  useEffect(() => {
    schools
  }, [schools])

  useEffect(() => {
    dispatch(getSchool())
  
  }, [])


  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);

  const data = [
    { key: "Não irei" },
    { key: "Somente ida" },
    { key: "Somente a volta" },
    { key: "Ida e volta" },
  ];

  const renderItemGo = ({ item }) => (
    <ItemSelected
      item={{
        key: item.key,
        label: item.key

      }}
      selectedItemGo={selectedItemGo}
      setSelectedItem={setSelectedItemGo}
      icon="checkbox-blank-circle"
      icon2="checkbox-blank-circle-outline"
    />
  );


  const renderItemSchool = ({ item }) => (
    <ItemSelected
      item={{
        key: item.id,
        label: item.name

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
        data={schools}
        renderItem={renderItemSchool}
        keyExtractor={(item) => item.name}
      />

      <Text style={[styles.titleAdress, { marginTop: 10 }]}>Você vai?</Text>

      <FlatList
        data={data}
        renderItem={renderItemGo}
        keyExtractor={(item) => item.key}
      />

      <BtnPrimary fn={submit} text="Enviar" />
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