import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getStudentPeriod } from "../store/Route/thunks";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardPeriod(props: { onClosePeriod: (isOpenCheck: boolean) => void, setPeriod: (local: object) => void }) {

  const dispatch = useDispatch();

  const handleCheckClose = () => {
    props.onClosePeriod(false);

  }

  const submit = async () => {
    if (selectedItemGo === null) {
      return;
    }
    const currentDate = new Date().toISOString().split('T')[0]
    
    let period = selectedItemGo;
    if(period == 'Matutino'){
      period = 'MORNING';
    }if(period == 'Vespertino'){
      period = 'EVENING';
    }if(period == 'Noturno'){
      period = 'NIGHT';
    }
    console.log(period, currentDate);
    dispatch(getStudentPeriod(period, '2024-05-28'))

    await AsyncStorage.setItem('period', period);


    props.setPeriod(selectedItemGo);
    handleCheckClose();
  }


  const [selectedItemGo, setSelectedItemGo] = useState(null);

  const data = [
    { key: "Matutino" },
    { key: "Vespertino" },
    { key: "Noturno" },
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




  return (
    <ModalComponent handleCheckClose={handleCheckClose}>
      <Text style={styles.titleAdress}>Selecione o seu Periodo</Text>

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