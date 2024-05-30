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

export default function ListPeople(props: { onClosePeople: (isOpenCheck: boolean) => void, setLocal: (local: object) => void, destinationLocation: any }) {
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

  const peoplesObj = (item) => {
    setSelectedItemSchool(item)
    console.log(item.studentRoute.user, 'item')
  }

  const setCloseCamera = (closeCamera: boolean) => {
    setSelectedItemSchool(null)
  }

  const renderItemSchool = ({ item }) => (
    <ItemSelected
    key={item.studentRoute.id}
      item={{
        key: item.studentRoute.id,
        label: item.studentRoute.user.name,
        image: item.studentRoute.imageData
      }}
      IconCamera="camera"
      selectedItemGo={selectedItemSchool}
      setSelectedItem={() => peoplesObj(item)}

    />
  )
  return (
    <View>
      <ModalComponent handleCheckClose={handleCheckClose}>
        {props.destinationLocation ? (
          <>
            <Text style={styles.titleAdress}>Alunos da rota</Text>

            {students.length === 0 && <Text>Nenhum aluno encontrado</Text>}
            <FlatList
              data={students}
              renderItem={renderItemSchool}
              keyExtractor={(item) => item.user?.username.toString()}
            />

            {selectedItemSchool && (
              <Modal style={{ flex: 1 }}>
                <CameraComponent setOpenCamera={setCloseCamera} people={selectedItemSchool} />
              </Modal>
            )}
          </>
        ) : (
          <Text style={styles.titleAdress}>Você primeiro precisa selecionar a escola e o periodo</Text>
        )}
      </ModalComponent>
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