import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StoreAdress from "./storeAdress";


export default function ListAdress(props: { open: boolean, onCloseList: (isOpenList: boolean) => void, setLocal: (local: object) => void}) {
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);

  const [selectedItemGo, setSelectedItemGo] = useState(null);


  const setSelectedItem = (item) => {
    props.setLocal(item);
    setSelectedItemGo(item);
    console.log(item);
  }
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
    <TouchableOpacity
      style={[styles.itemSchool, selectedItemGo === item.key && styles.selectedItemGo]}
      onPress={() => setSelectedItem(item.key)}
    >
      <Icon
        name={selectedItemGo === item.key ? 'checkbox-blank-circle-outline' : 'map-marker-circle'}
        style={[styles.iconMap, selectedItemGo === item.key && { color: "#000" }]}
        size={25}
        margin={20}
      />

      <Text style={styles.itemText}>
        {item.city}, {item.state}, {item.cep}
      </Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.adressContainer}>
      <TouchableOpacity
        onPress={handleListClose}
        style={styles.cloneModal}
      >
        <Ionicons name="remove-outline" size={50} />
      </TouchableOpacity>
      <Text style={styles.titleAdress}>Seus endereços</Text>
      <TouchableOpacity
        style={styles.itemSchool}
      >
        <Icon
          name={'map-marker-circle'}
          style={[styles.iconMap]}
          size={25}
          margin={20}
          onPress={() => setSelectedItemGo('Tempo real')}

        />

        <Text style={styles.itemText}>
          User localização atual
        </Text>
      </TouchableOpacity>


      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />

      <TouchableOpacity
        onPress={() => {
          setOpenAdress(true);
          setListAdress(false);
        }}
        style={styles.itemSchool}
      >
        <Icon
          name={'plus-circle-outline'}
          style={[styles.iconMap]}
          size={25}
          margin={20}
        />

        <Text style={styles.itemText}>
          Cadastrar novo endereço
        </Text>
      </TouchableOpacity>


      {openNewAdress && <StoreAdress open={openNewAdress} onClose={handleModalClose} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  adressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonOpenList: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
  },
  input: {
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    margin: 5,
    borderWidth: 1,
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#44433F",
    padding: 10,
    borderColor: "#3B566E",
  },
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#BC1C2C",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
  },
  item: {
    padding: 16,
    borderTopColor: "#EDB047",
    fontSize: 18,
  },
  iconMap: {
    color: "#EDB047",
  },

  blue: {
    color: "#3B566E",
  },
  cloneModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOpenCheck: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 50,
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
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  selectedItemGo: {
    backgroundColor: "#EDB047", // Cor de fundo para o item selecionado
  },
});