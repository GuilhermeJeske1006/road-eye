// import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useEffect, useState } from "react";
// import ItemSelected from "./geral/item-seleted";
// import BtnPrimary from "./geral/btn-primary";
// import ModalComponent from "./geral/modal";
// import { useDispatch } from "react-redux";
// import { getSchool } from "../store/school/thunks";
// import { useSelector } from "react-redux";

// export default function ListSchool(props: { onCloseSchool: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
//   const [openCheck, setOpenCheck] = useState<boolean>(false);

//   const [selectedItemGo, setSelectedItemGo] = useState(null);
//   const [selectedItemSchool, setSelectedItemSchool] = useState(null);
//   const schools = useSelector((state: any) => state.SchoolReducer.data);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getSchoolApi()
//   }, [])

//   const getSchoolApi = () => {
//     dispatch(getSchool());
//   }

//   const renderItemSchool = ({ item }) => (
//     console.log(item, 'jwpefjopwjefpo'),
//     <ItemSelected
//       item={{
//         key: item.id,
//         label: item.name
//       }}
//       selectedItemGo={selectedItemSchool}
//       setSelectedItem={setSelectedItemSchool}
//       icon="school"
//       icon2="school"
//     />
//   )

  
//   const handleCheckClose = () => {
//     props.onCloseSchool(false);
//     setOpenCheck(false);

//   }

//   const submit = () => {
//     if (selectedItemGo === null || selectedItemSchool === null) {
//       return;
//     }
//     console.log(selectedItemGo, selectedItemSchool);
//     props.setLocal(selectedItemSchool);
//     handleCheckClose();
//   }

//   return (
//     <ModalComponent handleCheckClose={handleCheckClose}>
//       <Text style={styles.titleAdress}>Selecione a sua escola</Text>
//       <FlatList
//         data={schools}
//         renderItem={renderItemSchool}
//         keyExtractor={(item) => item.id}
//       />

//       <BtnPrimary fn={submit} text="Ir agora" />
//     </ModalComponent>
//   );
// }

// const styles = StyleSheet.create({
//   titleAdress: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

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


export default function ListSchool(props: { onCloseSchool: (isOpenCheck: boolean) => void, setLocal: (local: object) => void }) {
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListSchool, setListSchool] = useState<boolean>(false);
  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const address = useSelector((state: any) => state.AdressReducer.data);
  const schools = useSelector((state: any) => state.SchoolReducer.data);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [selectedItemSchool, setSelectedItemSchool] = useState(null);

  const dispatch = useDispatch();

  const setSelectedItem = (item) => {
    props.setLocal(item);
    setSelectedItemGo(item);
  }


  useEffect(() => {
    setOpenAdress(openNewAdress);
  }, [openNewAdress])



    const handleCheckClose = () => {
    props.onCloseSchool(false);
    setOpenCheck(false);

  }


  useEffect(() => {
    getApiSchool();
  }, [])

  const getApiSchool = () => {
      dispatch(getSchool());

    
  }

    const submit = () => {
    if (selectedItemGo === null || selectedItemSchool === null) {
      return;
    }
    console.log(selectedItemGo, selectedItemSchool);
    props.setLocal(selectedItemSchool);
    handleCheckClose();
  }

  const renderItem = ({ item }) => (
    <ItemSelected
      key={item.id}
      item={{
        key: item.id,
        label: `${item.name}`
      }}
      selectedItemGo={selectedItemGo}
      setSelectedItem={setSelectedItem}
      icon="school"
      icon2="school"
    />
  );



  return (
    <ModalComponent handleCheckClose={handleCheckClose}>
      <Text style={styles.titleAdress}>Selecione a escola</Text>
      <FlatList
        data={schools?.body}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <BtnPrimary fn={submit} text="Ir agora" />

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