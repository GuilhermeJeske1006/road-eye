import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import CameraComponent from "./camera";
import { useSelector } from "react-redux";
import * as Notifications from 'expo-notifications';




export default function ListPeople(props: { onClosePeople: (isOpenCheck: boolean) => void, setLocal: (local: object) => void, destinationLocation: any }) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const students = useSelector((state: any) => state.RouteReducer.data);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);

  const handleCheckClose = () => {
    props.onClosePeople(false);
    setOpenCheck(false);

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
        title: 'Chegou a escola',
        body: 'O motorista chegou a escola',
      },
      trigger: null,
    });
  }


  const peoplesObj = (item) => {
    setSelectedItemSchool(item)
    console.log(item.studentRoute.user, 'item')
  }

  const setCloseCamera = (closeCamera: boolean) => {
    setSelectedItemSchool(null)
  }

  const renderItemSchool = ({ item }) => (
    <ItemSelected
    key={item.studentRoute?.id}
      item={{
        key: item.studentRoute?.id,
        label: item.studentRoute?.user?.name,
        image: item.studentRoute?.imageData
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

            {students?.length === 0 && (
              <>
              <Text>Nenhum aluno encontrado</Text>
              <BtnPrimary fn={handleCallNotification} text="Sinalizar que chegou a escola" />
              </>
            )}
            
            <FlatList
              data={students}
              renderItem={renderItemSchool}
              keyExtractor={(item) => item.user?.username.toString()}
            />

            {selectedItemSchool && (
              <Modal style={{ flex: 1 }}>
                <CameraComponent setOpenCamera={setCloseCamera} people={selectedItemSchool}   />
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