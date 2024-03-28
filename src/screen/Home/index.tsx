import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import Ionicons from "react-native-vector-icons/Ionicons";
import MapViewDirections from "react-native-maps-directions";
import CustomMarker from "../../components/customMarker";
import CardMarker from "../../components/cardMarker";
import ListSchool from "../../components/listSchool";
import ListPeople from "../../components/listPeople";
import CameraComponent from "../../components/camera";
import BtnFloating from "../../components/geral/btn-floating";



export default function HomeScreen() {

  const mapRef = useRef<MapView>(null)
  const [location, setLocation] = useState<null | LocationObject>();

  const [isDriver] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isUSer, setIsUSer] = useState<boolean>(false);
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openCardMarker, setOpenCardMarker] = useState<boolean>(false);
  const [openListSchool, setListSchool] = useState<boolean>(false);
  const [openListPeople, setListPeople] = useState<boolean>(false);
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
  const handleSchoolClose = (isOpen) => {
    setListSchool(isOpen);
  }
  const handlePeopleClose = (isOpen) => {
    setListPeople(isOpen);
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
      <TouchableOpacity
        style={styles.buttonSpeed}
      >
        <Text style={styles.textSpeed}>{location?.coords.speed.toFixed()} km/h</Text>
      </TouchableOpacity>

      {isUSer && (<BtnFloating icon="format-list-bulleted" fn={() => setListAdress(true)} right={5} bottom={110} />)}
      {isUSer && (<BtnFloating icon="format-list-checks" fn={() => setOpenCheck(true)} right={5} bottom={210} />)}
      {isDriver && (<BtnFloating icon="school" fn={() => setListSchool(true)} right={5} bottom={200} />)}
      {isDriver && (<BtnFloating icon="people" fn={() => setListPeople(true)} right={5} bottom={110} Ionicons={true} />)}
      {isDriver && (<BtnFloating icon="camera" fn={() => setListAdress(true)} right={5} bottom={290} />)}
      {/* <CameraComponent /> */}
      {openListPeople && <ListPeople onClosePeople={handlePeopleClose} setLocal={setLocalDestination} />}
      {openListSchool && <ListSchool onCloseSchool={handleSchoolClose} setLocal={setLocalDestination} />}
      {openCardMarker && <CardMarker openCardMarker={openCardMarker} setOpenCardMarker={setOpenCardMarker} />}
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
  buttonOpenCamera: {
    position: "absolute",
    bottom: 290,
    right: 5,
    backgroundColor: "white",
    borderRadius: 50,
  },

  buttonOpenCheck: {
    position: "absolute",
    bottom: 200,
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