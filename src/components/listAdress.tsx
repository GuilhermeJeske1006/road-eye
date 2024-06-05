import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import StoreAdress from "./storeAdress";
import ItemSelected from "./geral/item-seleted";
import ModalComponent from "./geral/modal";
import { useDispatch } from "react-redux";
import {
  getAddress,
  postAddress,
  postAddressCoordinates,
  putActiveAddress,
} from "../store/Adress/thunks";
import { useSelector } from "react-redux";
import { LocationObject } from "expo-location";
import Loading from "./geral/loading";

export default function ListAdress(props: {
  open: boolean;
  onCloseList: (isOpenList: boolean) => void;
  setLocal: (local: object) => void;
  setLocalTime: any;
}) {
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [selectedItemGo, setSelectedItemGo] = useState(null);
  const address = useSelector((state: any) => state.AdressReducer.data);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const setSelectedItem = async (item) => {
    try {
      const data = {
        idAddress: item.id,
      };
      setLoading(true);
      dispatch(putActiveAddress(data));
      props.setLocal(item);
      setSelectedItemGo(item);
      handleListClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      dispatch(getAddress());
    }
  };
  useEffect(() => {
    setListAdress(props.open);
  }, [props.open]);

  useEffect(() => {
    setOpenAdress(openNewAdress);
  }, [openNewAdress]);

  const handleListClose = () => {
    props.onCloseList(false);
    setListAdress(false);
  };

  const handleModalClose = (isOpen) => {
    setOpenAdress(isOpen);
  };

  const openStoreAdress = () => {
    setListAdress(false);
    setOpenAdress(true);
  };

  const postRealTimeLocation = async () => {
    try {
      setLoading(true);
      await dispatch(postAddressCoordinates(props.setLocalTime.coords));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getApiAddress();
  }, []);

  const getApiAddress = () => {
    dispatch(getAddress());
  };

  const renderItem = ({ item }) => (
    <ItemSelected
      key={item.address.id}
      item={{
        key: item.address,
        label: `${item.address.city}, ${item.address.state}, ${item.address.postCode}`,
      }}
      selectedItemGo={selectedItemGo}
      setSelectedItem={setSelectedItem}
      icon={"checkbox-blank-circle-outline"}
      icon2={"map-marker-circle"}
    />
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ModalComponent handleCheckClose={handleListClose}>
            {openNewAdress ? (
              <StoreAdress open={openNewAdress} onClose={handleModalClose} />
            ) : (
              <>
                <Text style={styles.titleAdress}>
                  Informe o seu endereço que será ativo
                </Text>
                <ItemSelected
                  item={{
                    key: "0",
                    label: "Usar localização atual",
                  }}
                  selectedItemGo={selectedItemGo}
                  setSelectedItem={() => postRealTimeLocation()}
                  icon={"map-marker-circle"}
                  icon2={"map-marker-circle"}
                />
                <FlatList
                  data={address}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
                <ItemSelected
                  item={{
                    key: "6",
                    label: "Cadastrar novo endereço",
                  }}
                  selectedItemGo={selectedItemGo}
                  setSelectedItem={openStoreAdress}
                  icon={"plus-circle-outline"}
                  icon2={"plus-circle-outline"}
                />
              </>
            )}
          </ModalComponent>
        </>
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
