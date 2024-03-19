import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";

const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

export default function App() {
  const [location, setLocation] = useState<null | LocationObject>(null);

  const isDriver = useState<boolean>(false);
  const isUSer = useState<boolean>(true);
  const openNewAdress = useState<boolean>(false);
  const [text, onChangeText] = useState("Useless Text");
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

  function ListAdress(){
    return (
      <View style={styles.adressContainer}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
      </View>
    )
  }

  function StoreAdress() {
    return (
      <View style={styles.adressContainer}>
        <SafeAreaView style={{ marginBottom: 5 }}>
          <Text style={styles.titleAdress}>Adicione um novo endereço</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            placeholder="CEP"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Rua"
            onChangeText={onChangeText}
          />
          <TextInput
            placeholder="Bairro"
            style={styles.input}
            onChangeText={onChangeText}
          />
          <TextInput
            placeholder="Cidade"
            style={styles.input}
            onChangeText={onChangeText}
          />
          <TextInput
            placeholder="Estado"
            style={styles.input}
            onChangeText={onChangeText}
          />
          <TextInput
            placeholder="Complemento"
            style={styles.input}
            onChangeText={onChangeText}
          />
          <TextInput
            placeholder="Numero"
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
        </SafeAreaView>

        <TouchableOpacity style={styles.button}>
        <Text>Press Here</Text>
      </TouchableOpacity>
      </View>
    );
  }

  function HomeScreen() {
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
      {/* {
        openNewAdress && <StoreAdress />
      } */}
      <ListAdress/>


      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
  input: {
    borderRadius: 10,

    height: 50,
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,

  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
