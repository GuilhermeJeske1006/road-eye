import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AppRegistry
} from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import LoginScreen from "./screen/Login";


const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

const MyTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    background: "#fff",
    card: "#EDB047",
    text: "#fff",
    border: "#fff",
    notification: "#fff",
  },
};

AppRegistry.registerComponent('my-app', () => LoginScreen);
AppRegistry.runApplication('my-app', { rootTag: document.getElementById('root') });


export default function App() {

  const [location, setLocation] = useState<null | LocationObject>(null);

  const isDriver = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const isUSer = useState<boolean>(true);
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [cep, onChangeCep] = useState("");
  const [street, onChangeStreet] = useState("");
  const [neighborhood, onChangeNeighborhood] = useState("");
  const [city, onChangeCity] = useState("");
  const [state, onChangeState] = useState("");
  const [complement, onChangeComplement] = useState("");
  const [number, onChangeNumber] = useState("");
  

  async function requestLocationPermission() {
    const granted = requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (location) => {
        setLocation(location);
      }
    );
  }, []);

  async function handleSubmit() {
    const data = {
      cep,
      street,
      neighborhood,
      city,
      state,
      complement,
      number,
    };
    console.log(data);
  }

 

  function ListAdress() {
    return (
      <View  style={styles.adressContainer}>
        <TouchableOpacity
          onPress={() => setListAdress(false)}
          style={styles.cloneModal}
        >
          <Ionicons name="remove-outline" size={50} />
        </TouchableOpacity>
        <Text style={styles.titleAdress}>Seus endereços</Text>
        <Text style={styles.item}>
          <Icon
            name="map-marker-circle"
            style={styles.iconMap}
            size={25}
            margin={20}
          />
          Usar localização atual
        </Text>

        <FlatList
          data={[
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
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setOpenCheck(false)}>
              <Text style={styles.item}>
                <Icon
                  name="map-marker-circle"
                  style={styles.iconMap}
                  size={25}
                  margin={20}
                />
                {item.city}, {item.state}, {item.cep}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text
          onPress={() => {
            setOpenAdress(true);
            setListAdress(false);
          }}
          style={styles.item}
        >
          Cadastrar novo endereço
        </Text>
      </View>
    );
  }

  function CheckUser() {
    return (
      <View style={styles.adressContainer}>
        <TouchableOpacity
          onPress={() => setOpenCheck(false)}
          style={styles.cloneModal}
        >
          <Ionicons name="remove-outline" size={50} />
        </TouchableOpacity>
        <Text style={styles.titleAdress}>Selecione a sua escola</Text>

        <FlatList
          data={[
            { key: "Escola S" },
            { key: "SENAI" },
            { key: "E.B.M Anna othilia" },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setOpenCheck(false)}>
              <Text style={styles.itemSchool}>
                <Icon
                  name="school"
                  style={styles.iconMap}
                  size={25}
                  margin={20}
                />
                {item.key}
              </Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.titleAdress}>Selecione a sua escola</Text>

        <FlatList
          data={[
            { key: "Não irei" },
            { key: "Somente ida" },
            { key: "Somente a volta" },
            { key: "Ida e volta" },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setOpenCheck(false)}>
              <Text style={styles.itemSchool}>
                <Icon
                  name="school"
                  style={styles.iconMap}
                  size={25}
                  margin={20}
                />
                {item.key}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  function StoreAdress() {
    return (
      <View style={styles.adressContainer}>
        <TouchableOpacity
          onPress={() => setOpenAdress(false)}
          style={styles.cloneModal}
        >
          <Ionicons name="remove-outline" size={50} />
        </TouchableOpacity>
        <SafeAreaView style={{ marginBottom: 5 }}>
          <Text style={styles.titleAdress}>Adicione um novo endereço</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeCep}
            placeholder="CEP"
            value={cep}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Rua"
            value={street}
            onChangeText={onChangeStreet}
          />
          <TextInput
            placeholder="Bairro"
            style={styles.input}
            onChangeText={onChangeNeighborhood}
          />
          <TextInput
            placeholder="Cidade"
            style={styles.input}
            onChangeText={onChangeCity}
          />
          <TextInput
            placeholder="Estado"
            style={styles.input}
            onChangeText={onChangeState}
          />
          <TextInput
            placeholder="Complemento"
            style={styles.input}
            onChangeText={onChangeComplement}
          />
          <TextInput
            placeholder="Numero"
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
        </SafeAreaView>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }



  function HomeScreen({ navigation }) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {location && (
          <MapView
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            style={styles.map}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
              description="You are here"
            />
          </MapView>
        )}
        {openNewAdress && <StoreAdress />}
        {isUSer && (
          <TouchableOpacity
            onPress={() => setListAdress(true)}
            style={styles.buttonOpenList}
          >
            <Icon
              name="format-list-bulleted"
              style={styles.iconMap}
              size={30}
              margin={20}
            />
          </TouchableOpacity>
        )}
        {isUSer && (
          <TouchableOpacity
            onPress={() => setOpenCheck(true)}
            style={styles.buttonOpenCheck}
          >
            <Icon
              name="format-list-checks"
              style={styles.iconMap}
              size={30}
              margin={20}
            />
          </TouchableOpacity>
        )}
        {openListAdress && <ListAdress />}
        {openCheck && <CheckUser />}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isAuth ? (
        <NavigationContainer theme={MyTheme}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Login" component={LoginScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen />
      )}
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
    padding: 12,
    fontSize: 18,
    // backgroundColor: "#EDB047",
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
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
