import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import StoreAdress from "../../components/storeAdress";
import ListAdress from "../../components/listAdress";
import CheckUser from "../../components/checkUser";
import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



export default function HomeScreen() {
  const [location, setLocation] = useState<null | LocationObject>(null);

  const isDriver = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const isUSer = useState<boolean>(true);
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openCardMarker, setOpenCardMarker] = useState<boolean>(false);

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

  const handleListClose = (isOpen) => {
    setListAdress(isOpen);
  }

  const handleCheckClose = (isOpen) => {
    setOpenCheck(isOpen);
  }

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
            onPress={() => { setOpenCardMarker(true) }}

          >

            {
              openCardMarker && (
                <View style={styles.card}>
                  <TouchableOpacity style={{ alignItems: 'flex-end' }}>
                    <Icon name="close" size={20} color="#000" />
                  </TouchableOpacity>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: 'https://picsum.photos/id/237/200/300' }}
                      style={{ width: 100, height: 100, borderRadius: 100, }}
                    ></Image>

                    <Text style={[styles.title, { textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }]}>12C2-ABC</Text>

                  </View>

                  <Text style={styles.title}>Motorista José Maria</Text>
                  <Text style={styles.content}>Para SENAI</Text>

                  <TouchableOpacity
                    style={[styles.button, {
                      marginTop: 20, flexDirection: 'row',
                      alignItems: 'center',
                    }]}
                  >
                    <Icon name="phone" size={20} color="#fff" />
                    <Text style={styles.buttonText}>
                      Ligar</Text>
                  </TouchableOpacity>

                </View>

              )
            }
            <Icon
              name="map-marker"
              color="#BC1C2C"
              size={50}
            />

          </Marker>
        </MapView>
      )}
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

      <TouchableOpacity
        style={styles.buttonSpeed}
      >

        <Text style={styles.textSpeed}>0 km/h</Text>
      </TouchableOpacity>

      {openListAdress && <ListAdress open={openListAdress} onCloseList={handleListClose} />}
      {openCheck && <CheckUser onCloseCheck={handleCheckClose} />}
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
  item: {
    padding: 16,
    borderTopColor: "#EDB047",
    fontSize: 18,
  },
  iconMap: {
    color: "#EDB047",
  },
  buttonOpenCheck: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  content: {
    fontSize: 16,
  },

  buttonSpeed: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    borderRadius: 50,
  },
  textSpeed: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    borderRadius: 100,
    backgroundColor: "#EDB047",
    color: "#fff",
    borderWidth: 2,
    borderColor: "#EDB047",
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "400",
    marginLeft: 10,
    alignItems: 'center',
    textAlign: 'center',

  },
  image: {
    width: 300,
    height: 300,
    alignSelf: "center",
  },
  button: {
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: "#BC1C2C",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",

  },
})