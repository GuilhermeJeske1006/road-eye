import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StoreAdress from "./storeAdress";
import ItemSelected from "./geral/item-seleted";
import ModalComponent from "./geral/modal";


export default function ListAdress(props: { open: boolean, onCloseList: (isOpenList: boolean) => void, setLocal: (local: object) => void }) {
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [selectedItemGo, setSelectedItemGo] = useState(null);


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

  const data = [
    {
      key: "1",
      adress: "Rua 1",
      number: 1,
      cep: 123456,
      city: "São Paulo",
      state: "SP",
      complement: "Casa",
    },
    {
      key: "2",
      adress: "Rua 1",
      number: 1,
      cep: 123456,
      city: "São Paulo",
      state: "SP",
      complement: "Casa",
    },
    {
      key: "3",
      adress: "Rua 1",
      number: 1,
      cep: 123456,
      city: "São Paulo",
      state: "SP",
      complement: "Casa",
    },
    {
      key: "4",
      adress: "Rua 1",
      number: 1,
      cep: 123456,
      city: "São Paulo",
      state: "SP",
      complement: "Casa",
    },
    {
      key: "5",
      adress: "Rua 1",
      number: 1,
      cep: 123456,
      city: "São Paulo",
      state: "SP",
      complement: "Casa",
    },
  ];

  const renderItem = ({ item }) => (
    <ItemSelected
      item={{
        key: item.key,
        label: `${item.city}, ${item.state}, ${item.cep}`
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
        data={data}
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