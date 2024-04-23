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


export default function ListAdress(props: { open: boolean, onCloseList: (isOpenList: boolean) => void, setLocal: (local: object) => void }) {
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const address = useSelector((state: any) => state.AdressReducer.data);
  const dispatch = useDispatch();

  const setSelectedItem = (item) => {
    props.setLocal(item);
    setSelectedItemGo(item);
  }
  useEffect(() => {
    setListAdress(props.open);
  }, [props.open]);

  useEffect(() => {
    setOpenAdress(openNewAdress);
  }, [openNewAdress])

  const handleListClose = () => {
    props.onCloseList(false);
    setListAdress(false);
  }

  const handleModalClose = (isOpen) => {
    setOpenAdress(isOpen);
  };

  useEffect(() => {
    getApiAddress();
  
  }, [])


  const getApiAddress = () => {
      dispatch(getAddress());
  }


  const renderItem = ({ item }) => (
    console.log(item.address),
    <ItemSelected
      item={{
        key: item.address.id,
        label: `${item.address.city}, ${item.address.state}, ${item.address.postCode}`
      }}
      selectedItemGo={selectedItemGo}
      setSelectedItem={setSelectedItem}
      icon={'checkbox-blank-circle-outline'}
      icon2={'map-marker-circle'}
    />
  );



  return (
    <ModalComponent handleCheckClose={handleListClose}>
      <Text style={styles.titleAdress}>Seus endereços</Text>
      <ItemSelected
        item={{
          key: "0",
          label: "Usar localização atual"
        }}
        selectedItemGo={selectedItemGo}
        setSelectedItem={() => setSelectedItemGo('Tempo real')}
        icon={'map-marker-circle'}
        icon2={'map-marker-circle'}
      />
      <FlatList
        data={address}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      <ItemSelected
        item={{
          key: "6",
          label: "Cadastrar novo endereço"
        }}
        selectedItemGo={selectedItemGo}
        setSelectedItem={() => {
          setOpenAdress(true);
          setListAdress(false);
        }}
        icon={'plus-circle-outline'}
        icon2={'plus-circle-outline'}
      />

      {openNewAdress && <StoreAdress open={openNewAdress} onClose={handleModalClose} />}
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