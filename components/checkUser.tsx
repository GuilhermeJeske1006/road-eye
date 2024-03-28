import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";

export default function CheckUser(props: { onCloseCheck: (isOpenCheck: boolean) => void,  setLocal: (local: object) => void}) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);

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

  
  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);

  const data = [
    { key: "Não irei" },
    { key: "Somente ida" },
    { key: "Somente a volta" },
    { key: "Ida e volta" },
  ];




  const renderItemGo = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemSchool, selectedItemGo === item.key && styles.selectedItemGo]}
      onPress={() => setSelectedItemGo(item.key)}
    >
      <Icon
        name={selectedItemGo === item.key ? 'checkbox-blank-circle' : 'checkbox-blank-circle-outline'}
        style={[styles.iconMap, selectedItemGo === item.key && { color: "#000" }]}
        size={25}
        margin={20}
      />

      <Text style={styles.itemText}>{item.key}</Text>
    </TouchableOpacity>
  );

  const dataSchool = [
    { key: "Escola S" },
    { key: "SENAI" },
    { key: "E.B.M Anna othilia" },
  ]

  const renderItemSchool = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemSchool, selectedItemSchool === item.key && styles.selectedItemGo]}
      onPress={() => setSelectedItemSchool(item.key)}
    >
      <Icon
        name='school'
        style={[styles.iconMap, selectedItemSchool === item.key && { color: "#000" }]}
        size={25}
        margin={20}
      />

      <Text style={styles.itemText}>{item.key}</Text>
    </TouchableOpacity>
  )


  return (
    <View style={styles.adressContainer}>
      <TouchableOpacity
        onPress={handleCheckClose}
        style={styles.cloneModal}
      >
        <Ionicons name="remove-outline" size={50} />
      </TouchableOpacity>
      <Text style={styles.titleAdress}>Selecione a sua escola</Text>

      <FlatList
        data={dataSchool}
        renderItem={renderItemSchool}
        keyExtractor={(item) => item.key}
      />

      <Text style={[styles.titleAdress, { marginTop: 10 }]}>Você vai?</Text>

      <FlatList
        data={data}
        renderItem={renderItemGo}
        keyExtractor={(item) => item.key}
      />
      <TouchableOpacity
        onPress={submit}
        style={[styles.button, { marginTop: 20 }]}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
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
  selectedItemGo: {
    backgroundColor: "#EDB047", // Cor de fundo para o item selecionado
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
    marginLeft: 10, // Espaço entre o ícone e o texto
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
});