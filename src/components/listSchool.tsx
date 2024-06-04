
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StoreAdress from "./storeAdress";
import ItemSelected from "./geral/item-seleted";
import ModalComponent from "./geral/modal";
import { useDispatch } from "react-redux";
import { getAddress } from "../store/Adress/thunks";
import { useSelector } from "react-redux";
import { getSchool } from "../store/school/thunks";
import BtnPrimary from "./geral/btn-primary";
import CardPeriod from "./cardPeriod";
import * as Notifications from 'expo-notifications';
import CardType from "./cardType";


export default function ListSchool(props: { onCloseSchool: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const schools = useSelector((state: any) => state.SchoolReducer.data);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openPeriod, setOpenPeriod] = useState<boolean>(true);
  const [type, setType] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setOpenAdress(openNewAdress);
  }, [openNewAdress])

    const handleCheckClose = () => {
    props.onCloseSchool(false);
    setOpenCheck(false);

  }

  const onCloseType = (isOpenCheck: boolean, type) => {
    if(type === 1){
      onClosePeriod(false, 1)
    }
    setType(false)
  }


  useEffect(() => {
    dispatch(getSchool());
  }, [])


  const onClosePeriod = (isOpenCheck: boolean, type) => {
    if(type === 1){
      handleCheckClose()
    }
    setOpenPeriod(false)
  }

  const setPeriod = (local: object) => {
    setOpenPeriod(true)
  }

    const submit = () => {
    if (selectedItemGo === null) {
      return;
    }
    console.log(selectedItemGo, 'selectedItemGo');
    props.setLocal(selectedItemGo);
    handleCheckClose();
    handleCallNotification();
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function handleCallNotification () {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Motorista saindo',
        body: 'O motorista está a caminho da sua escola!',
      },
      trigger: null,
    });
  }

  const renderItem = ({ item }) => (
    <ItemSelected
      key={item.id}
      item={{
        key: item,
        label: `${item.school.name}`
      }}
      selectedItemGo={selectedItemGo}
      setSelectedItem={setSelectedItemGo}
      icon="school"
      icon2="school"
    />
  );



  return (
    <View>
      { type ? (
        <CardType onCloseType={onCloseType} />
      ) : (
        <>
        {openPeriod ? (
        <CardPeriod onClosePeriod={onClosePeriod} setPeriod={setPeriod}  />
      ) : (
        <ModalComponent handleCheckClose={handleCheckClose}>
        <Text style={styles.titleAdress}>Selecione a escola</Text>
        <FlatList
          data={schools?.body}
          renderItem={renderItem}
          keyExtractor={(item) => item.body}
        />
        <BtnPrimary fn={submit} text="Ir agora" />
  
      </ModalComponent>
      )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});