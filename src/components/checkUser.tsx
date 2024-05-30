import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import ItemSelected from "./geral/item-seleted";
import BtnPrimary from "./geral/btn-primary";
import ModalComponent from "./geral/modal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSchool } from "../store/school/thunks";
import CardPeriod from "./cardPeriod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postStudentPeriod } from "../store/Route/thunks";

export default function CheckUser(props: {
  onCloseCheck: (isOpenCheck: boolean) => void;
  setLocal: (local: object) => void;
}) {
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const schools = useSelector((state: any) => state.SchoolReducer.data);
  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);
  const [openPeriod, setOpenPeriod] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleCheckClose = () => {
    props.onCloseCheck(false);
    setOpenCheck(false);
  };

  const submit = async () => {
    try {
      if (selectedItemGo === null || selectedItemSchool === null) {
        return;
      }
      const period = await AsyncStorage.getItem("period");

      let studentStatusEnum;

      if (selectedItemGo == "Não irei") {
        studentStatusEnum = "IWONTGO";
      }
      if (selectedItemGo == "Somente ida") {
        studentStatusEnum = "ONEWAYONLY";
      }
      if (selectedItemGo == "Somente a volta") {
        studentStatusEnum = "ONLYAROUND";
      }
      if (selectedItemGo == "Ida e volta") {
        studentStatusEnum = "ROUNDTRIP";
      }

      const currentDate = new Date().toISOString().split("T")[0];
      const data = {
        localDate: currentDate,
        school: selectedItemSchool,
        studentStatusEnum: studentStatusEnum,
        periodEnum: period,
      };
      dispatch(postStudentPeriod(data));

      props.setLocal(selectedItemSchool);
      handleCheckClose();
    } catch (error) {
      console.log(error);
    } finally {
      onClosePeriod(false, 1);
    }
  };

  useEffect(() => {
    schools;
  }, [schools]);

  useEffect(() => {
    dispatch(getSchool());
  }, []);

  const onClosePeriod = (isOpenCheck: boolean, type) => {
    if(type === 1){
      handleCheckClose()
    }
    setOpenPeriod(false);
  };
  const setPeriod = (local: object) => {
    setOpenPeriod(true);
  };

  const data = [
    { key: "Não irei" },
    { key: "Somente ida" },
    { key: "Somente a volta" },
    { key: "Ida e volta" },
  ];

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

  const renderItemSchool = ({ item }) => (
    <ItemSelected
      key={item.school.id}
      item={{
        key: item.school.id,
        label: item.school.name,
      }}
      selectedItemGo={selectedItemSchool}
      setSelectedItem={setSelectedItemSchool}
      icon="school"
      icon2="school"
    />
  );

  return (
    <>
      {openPeriod ? (
        <CardPeriod onClosePeriod={onClosePeriod} setPeriod={setPeriod} />
      ) : (
        <ModalComponent handleCheckClose={handleCheckClose}>
          <Text style={styles.titleAdress}>Selecione a sua escola</Text>

          <FlatList
            data={schools?.body}
            renderItem={renderItemSchool}
            keyExtractor={(item) => item.name}
          />

          <Text style={[styles.titleAdress, { marginTop: 10 }]}>Você vai?</Text>

          <FlatList
            data={data}
            renderItem={renderItemGo}
            keyExtractor={(item) => item.key}
          />

          <BtnPrimary fn={submit} text="Enviar" />
        </ModalComponent>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
