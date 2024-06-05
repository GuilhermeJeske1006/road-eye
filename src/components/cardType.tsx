import {
  FlatList,
  StyleSheet,
  Text,
} from "react-native";
import { useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardType(props: {
  onCloseType: (isOpenCheck: boolean, type: any) => void;
}) {
  const handleCheckClose = () => {
    props.onCloseType(false, 1);
  };

  const closeType = () => {
    props.onCloseType(false, 2);
  };

  const submit = async () => {
    if (selectedItemGo === null) {
      return;
    }

    let go = selectedItemGo;
    if (go == "Ida") {
      go = "ONEWAYONLY";
    }
    if (go == "Volta") {
      go = "ONLYAROUND";
    }
    await AsyncStorage.setItem("return", go);
    closeType();
  };

  const [selectedItemGo, setSelectedItemGo] = useState(null);

  const data = [{ key: "Ida" }, { key: "Volta" }];

  const renderItemGo = ({ item }) => (
    <ItemSelected
      key={item.key}
      item={{
        key: item.key,
        label: item.key,
      }}
      selectedItemGo={selectedItemGo}
      setSelectedItem={setSelectedItemGo}
      icon="checkbox-blank-circle"
      icon2="checkbox-blank-circle-outline"
    />
  );

  return (
    <ModalComponent handleCheckClose={handleCheckClose}>
      <Text style={styles.titleAdress}>Selecione se é ida ou volta</Text>

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
