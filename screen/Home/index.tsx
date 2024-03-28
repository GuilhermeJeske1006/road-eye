import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import StoreAdress from "../../components/storeAdress";
import ListAdress from "../../components/listAdress";
import CheckUser from "../../components/checkUser";
import { useEffect, useState, useRef } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapViewDirections from "react-native-maps-directions";
import CustomMarker from "../../components/customMarker";



export default function HomeScreen(props: { isUSer: boolean }) {

  const mapRef = useRef<MapView>(null)
  const [location, setLocation] = useState<null | LocationObject>();

  const isDriver = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const isUSer = useState<boolean>(true);
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openCardMarker, setOpenCardMarker] = useState<boolean>(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBaMRuorLtC5E6MZWFYKcdvkGxJAxZmQ18';
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };

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
        mapRef.current?.animateCamera({
          pitch: 70,
          center: location.coords,
        })
      }
    );
  }, []);


  const handleListClose = (isOpen) => {
    setListAdress(isOpen);
  }

  const handleCheckClose = (isOpen) => {
    setOpenCheck(isOpen);
  }


  const getDirections = (latitude, longitude) => {
    setDestinationLocation({
      latitude: latitude,
      longitude: longitude
    })
  }
  const setLocalOrigin = (local) => {
    setOriginLocation({
      latitude: -27.082058843712982, longitude: -48.96839966171515
    })
    console.log(originLocation, 'origin');
  }

  const setLocalDestination = (local) => {
    setDestinationLocation({
      latitude: -27.084351414741224, longitude: -48.969569104890034
    })
    console.log(local, 'local');
  }

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      {location && (
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomControlEnabled={true}
          loadingEnabled={true}
          loadingBackgroundColor={'#fff'}
          toolbarEnabled={false}
          style={styles.map}
        >
          <CustomMarker
            latitude={-23.5544}
            longitude={-46.6296}
            color={"#0F9D58"}
            id={'1'}
            onPress={getDirections}
          >
          </CustomMarker>
          <CustomMarker
            latitude={-23.5583}
            longitude={-46.6282}
            color={"#EDB047"}
            id={'2'}
            onPress={getDirections}
          >
          </CustomMarker>
          {destinationLocation ?
            <MapViewDirections
              origin={
                originLocation || location.coords
              }
              destination={
                destinationLocation
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#EDB047"
              lineDashPattern={[0]}
              optimizeWaypoints={true}
              resetOnChange={false}
              precision={'high'}
              onError={(errorMessage) => {
                setDestinationLocation(null);
                alert('Erro ao obter direções...');
              }}
            >
            </MapViewDirections>
            :
            null
          }
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            onPress={() => { setOpenCardMarker(true) }}
          >
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

      {
        openCardMarker && (
          <View style={styles.card} >
            <TouchableOpacity onPress={() => { setOpenCardMarker(false) }} style={{ alignItems: 'flex-end' }} >
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

      <TouchableOpacity
        style={styles.buttonSpeed}
      >
        <Text style={styles.textSpeed}>{location?.coords.speed.toFixed()} km/h</Text>
      </TouchableOpacity>

      {openListAdress && <ListAdress open={openListAdress} onCloseList={handleListClose} setLocal={setLocalOrigin} />}
      {openCheck && <CheckUser onCloseCheck={handleCheckClose} setLocal={setLocalDestination} />}
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
    bottom: 110,
    right: 5,
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
    bottom: 200,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    width: '80%',
    position: 'absolute',
    bottom: 20,
    zIndex: 100,
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