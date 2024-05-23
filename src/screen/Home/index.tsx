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
import ListSchool from "../../components/listSchool";
import ListPeople from "../../components/listPeople";
import CameraComponent from "../../components/camera";
import BtnFloating from "../../components/geral/btn-floating";
import CardDriver from "../../components/cardDriver";
import CardModal from "../../components/geral/card-modal";
import CardUser from "../../components/cardUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";



export default function HomeScreen() {

  const mapRef = useRef<MapView>(null)
  const [location, setLocation] = useState<null | LocationObject>();

  const [isDriver, setIsDriver] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isUSer, setIsUSer] = useState<boolean>(false);
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openCardDriver, setOpenCardDriver] = useState<boolean>(false);
  const [openListSchool, setListSchool] = useState<boolean>(false);
  const [openListPeople, setListPeople] = useState<boolean>(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBaMRuorLtC5E6MZWFYKcdvkGxJAxZmQ18';
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [openCardUser, setOpenCardUser] = useState<boolean>(false);
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [intermediatePoints, setIntermediatePoints] = useState([]);
  const students = useSelector((state: any) => state.RouteReducer.data);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await AsyncStorage.getItem('roleEnum');
        if (role === 'DRIVER') {
          setIsDriver(true);
          setIsUSer(false);
        } else {
          setIsUSer(true);
          setIsDriver(false);
        }
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    fetchRole();
  }, []); 

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
  const handleCardClose = (isOpen) => {
    setOpenCardUser(isOpen);
  }

  const getDirections = (latitude, longitude) => {
    setDestinationLocation({
      latitude: latitude,
      longitude: longitude
    })
  }
  const setLocalOriginUser = (local) => {
    setOriginLocation({
      latitude: local.latitude, longitude: local.longitude
    })
  }

  const setLocalDestination = (local) => {
    setDestinationLocation({
      latitude: local.address.latitude, longitude: local.address.longitude
    })
  }

  useEffect(() => {
      const intermediatePointsArray = [
        { latitude: -27.10482619524239, longitude: -48.99447837066357 },
         {latitude: -27.0866203989047, longitude: -48.97767921556972},
         {latitude: -27.127716580394903, longitude: -48.91217850963919}
      ];
      // Set the intermediate points state
      if(destinationLocation){
        setIntermediatePoints(intermediatePointsArray);
      }

  }, [originLocation, destinationLocation]);

  return (
    <View style={{  flex: 1 }}>

      {location && !openCamera && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          
          {/* Render intermediate points */}
          {intermediatePoints.map((point, index) => (
            <CustomMarker
              key={index}
              onPress={handleCardClose(true)}
              latitude={point.latitude}
              longitude={point.longitude}
              color={"#0F9D58"} // Change color as needed
              id={`intermediate_${index}`}
            />
          ))}
          {/* Render MapViewDirections with waypoints */}
          <MapViewDirections
            origin={originLocation || location.coords}
            destination={destinationLocation}
            waypoints={intermediatePoints}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="#EDB047"
            lineDashPattern={[0]}
            optimizeWaypoints={true}
            resetOnChange={false}
            precision={'high'}
            onError={(errorMessage) => {
              setDestinationLocation(null);
              alert('Error getting directions: ' + errorMessage);
            }}
          />
          {/* Render user marker */}
          <Marker
            coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
            title="User"
            pinColor="#BC1C2C"
          />
          {
            destinationLocation && (
              <Marker
                coordinate={destinationLocation}
                title="User"

                pinColor="#BC1C2C"
              />
            )
          }
          
        </MapView>
      )}
      {
        isDriver && (
        <TouchableOpacity
        style={styles.buttonSpeed}
      >
        <Text style={styles.textSpeed}>
          {location?.coords.speed.toFixed()} KM/H
          </Text>
        </TouchableOpacity>
        )
      }
      

      {isUSer && (<BtnFloating icon="format-list-bulleted" fn={() => setListAdress(true)} right={5} bottom={110} />)}
      {isUSer && (<BtnFloating icon="format-list-checks" fn={() => setOpenCheck(true)} right={5} bottom={210} />)}
      {isDriver && (<BtnFloating icon="school" fn={() => setListSchool(true)} right={5} bottom={200} />)}
      {isDriver && (<BtnFloating icon="people" fn={() => setListPeople(true)} right={5} bottom={110} Ionicons={true} />)}
      {/* {isDriver && (<BtnFloating icon="camera" fn={() => setOpenCamera(true)} right={5} bottom={290} />)} */}
    
      {openCamera && <CameraComponent setOpenCamera={setOpenCamera} />}      
      {openCardUser && <CardUser openCardUser={openCardUser} setOpenCardUser={setOpenCardUser}  />}
      {openListPeople && <ListPeople onClosePeople={handlePeopleClose} setLocal={setLocalDestination} />}
      {openListSchool && <ListSchool onCloseSchool={handleSchoolClose} setLocal={setLocalDestination} />}
      {openCardDriver && <CardDriver openCardDriver={openCardDriver} setOpenCardDriver={setOpenCardDriver} />}
      {openListAdress && <ListAdress open={openListAdress} onCloseList={handleListClose} setLocal={setLocalOriginUser} />}
      {openCheck && <CheckUser onCloseCheck={handleCheckClose} setLocal={setLocalDestination} />}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "#EDB047",
    color: "#fff",
    borderColor: "#EDB047",
    borderRadius: 50,
  },
})