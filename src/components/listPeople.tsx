import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import CameraComponent from "./camera";
import CardPeriod from "./cardPeriod";
import { useSelector } from "react-redux";

export default function ListPeople(props: { onClosePeople: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openPeriod, setOpenPeriod] = useState<boolean>(true);
  const students = useSelector((state: any) => state.RouteReducer.data);

  const handleCheckClose = () => {
    props.onClosePeople(false);
    setOpenCheck(false);

  }

  const submit = () => {
    if (selectedItemGo === null) {
      return;
    }
    console.log(selectedItemGo, 'selectedItemGo');
    props.setLocal(selectedItemSchool);
    handleCheckClose();
  }


  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);

  const setCloseCamera = (closeCamera: boolean) => {
    setSelectedItemSchool(null)
  }
  
  const onClosePeriod = (isOpenCheck: boolean) => {
    setOpenPeriod(false)
  }
  const setPeriod = (local: object) => {
    setOpenPeriod(true)
    console.log(local, 'f´wokefpowpefpweifo');
  }

  const renderItemSchool = ({ item }) => (
    <ItemSelected
      item={{
        key: item.studentRoute.id,
        label: item.studentRoute.user.name,
        image: item.studentRoute.imageData
      }}
      IconCamera="camera"
      selectedItemGo={selectedItemSchool}
      setSelectedItem={setSelectedItemSchool}

    />
  )


  return (
    <View>
      {openPeriod ? (
        <CardPeriod onClosePeriod={onClosePeriod} setPeriod={setPeriod} />
      ) : (
        <ModalComponent handleCheckClose={handleCheckClose}>
          <Text style={styles.titleAdress}>Alunos da rota</Text>

          <FlatList
            data={students}
            renderItem={renderItemSchool}
            keyExtractor={(item) => item.user?.username.toString()}
          />

          <BtnPrimary fn={submit} text="Ir agora" />

          {selectedItemSchool && (
            <Modal style={{ flex: 1 }}>
              <CameraComponent setOpenCamera={setCloseCamera} people={selectedItemSchool} />
            </Modal>
          )}
        </ModalComponent>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});