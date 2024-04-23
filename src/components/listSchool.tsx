import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import { useDispatch } from "react-redux";
import { getSchool } from "../store/school/thunks";
import { useSelector } from "react-redux";

export default function ListSchool(props: { onCloseSchool: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);
  const schools = useSelector((state: any) => state.SchoolReducer.data);


  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getSchool())
  }, [])

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
        data={schools}
        renderItem={renderItemSchool}
        keyExtractor={(item) => item.name}
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