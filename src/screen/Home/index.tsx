import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
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
import MapViewDirections from "react-native-maps-directions";
import CustomMarker from "../../components/customMarker";
import ListSchool from "../../components/listSchool";
import ListPeople from "../../components/listPeople";
import CameraComponent from "../../components/camera";
import BtnFloating from "../../components/geral/btn-floating";
import CardDriver from "../../components/cardDriver";
import CardUser from "../../components/cardUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"
import { putTokenPush } from "../../store/User/thunks";


export default function HomeScreen() {

  const mapRef = useRef<MapView>(null)
  const [location, setLocation] = useState<null | LocationObject>();

  const [isDriver, setIsDriver] = useState<boolean>(true);
  const [isUSer, setIsUSer] = useState<boolean>(false);
  const [openListAdress, setListAdress] = useState<boolean>(false);
  const [openCheck, setOpenCheck] = useState<boolean>(false);
  const [openCardDriver, setOpenCardDriver] = useState<boolean>(false);
  const [openListSchool, setListSchool] = useState<boolean>(false);
  const [openListPeople, setListPeople] = useState<boolean>(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBaMRuorLtC5E6MZWFYKcdvkGxJAxZmQ18';
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [openCardUser, setOpenCardUser] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [intermediatePoints, setIntermediatePoints] = useState([]);
  const students = useSelector((state: any) => state.RouteReducer.data);
  const [motorista, setMotorista] = useState<any>({})
  const [userSelect, setUserSelect] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState<String>('');
  const notificationReceivedRef = useRef<any>();
  const responseResponseRef = useRef<any>();

  useEffect(() => {
    handleTokenPush()
    notificationReceivedRef.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification, 'notification')
    });
    responseResponseRef.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response, 'response')
    });
  }, [])
  
  const handleTokenPush = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão de notificação negada');
      return;
    }
    let token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId || '',
    })).data;
    try {
      await AsyncStorage.setItem('expoPushToken', token);
      const data = {
        tokenPush: token
      }
      dispatch(putTokenPush(data))
    } catch (error) {
      console.error('Error saving expoPushToken:', error);
    }
    setExpoPushToken(token);
  }

  const dispatch = useDispatch()


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
      async (location) => {
        const role = await AsyncStorage.getItem('roleEnum');
  
        if (role === 'DRIVER') {
          var socket = new WebSocket('ws://3.92.91.141:8080/roadeye/connect');
  
          socket.onopen = async () => {
            const message = {
              type: 'authorization',
              token: await AsyncStorage.getItem('token'),
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
            console.log(message, 'iunifeonewfnoweoniew');
            socket.send(JSON.stringify(message));
          };
  
          // Evento de fechamento da conexão
          socket.onclose = () => {
            console.log('Conexão WebSocket fechada');
          };
  
          // Evento de erro
          socket.onerror = (error) => {
            console.error('Erro WebSocket:', error);
          };
  
          // Simular o envio de dados para /driverCoordinates (exemplo)
          setInterval(() => {
            const driverMessage = {
              type: 'driverCoordinates',
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            };
  
            socket.send(JSON.stringify(driverMessage));
          }, 10000); // Enviar a cada 5 segundos

          // socket.onmessage = (event) => {
          //   const message = JSON.parse(event.data);
          //   console.log('Mensagem recebida:', message);
  
          //   if (message.type === 'coordinates') {
          //     // Dados de coordenadas do canal recebidos
          //     setMotorista(message.coordinates);
          //     console.log('Dados de coordenadas do canal:', message.coordinates);
          //     // Faça o que precisar com os dados recebidos
          //   }
          // };
  
        } 
        else {
          // Evento de recebimento de mensagem
          socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Mensagem recebida:', message);
  
            if (message.type === 'coordinates') {
              // Dados de coordenadas do canal recebidos
              setMotorista(message.coordinates);
              console.log('Dados de coordenadas do canal:', message.coordinates);
              // Faça o que precisar com os dados recebidos
            }
          };
        }
  
        setLocation(location);
        mapRef.current?.animateCamera({
          pitch: 70,
          center: location.coords,
        });
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
  const handleCardUserOpen = (item) => {
    setUserSelect(item)
    setOpenCardUser(true);
  }

  const setLocalOriginUser = (local) => {
    setOriginLocation({
      latitude: local?.latitude, longitude: local?.longitude
    })
  }

  const setLocalDestination = (local) => {
    setDestinationLocation({
      latitude: local.address.latitude,
      longitude: local.address.longitude
    });


  };

  useEffect(() => {
    if (destinationLocation && students) { 
      const studentsRota = students.map((item) => {
        if(item){
          return {
            latitude: item?.userAddress?.latitude,
            longitude: item?.userAddress?.longitude,
            username: item?.studentRoute?.user?.username,
            image: item?.studentRoute?.imageData,
            id: item?.studentRoute?.user?.id,
            phone: item?.studentRoute?.user?.phone,
            school: item?.studentRoute?.school?.name
          }
        }
      });

      setIntermediatePoints(studentsRota); 
    }
  }, [destinationLocation, students]); // Include students in the dependency array
  

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
              onPress={()=> handleCardUserOpen(point)}
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
            strokeColor="#3a34eb"
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
          {/* {
          !isDriver ? (
            <>
            {motorista && (
                <Marker
                coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
                title="Você"
                pinColor="#fff"
              />
            )}
             
              <Marker
                coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
                title="Você"
                pinColor="#BC1C2C"
              />
            </>
          ) : (
            <Marker
              coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
              title="Você"
              pinColor="#BC1C2C"
            />
          
          )
        } */}

            <Marker
              coordinate={{ latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }}
              title="Você"
              pinColor="#BC1C2C"
            />
          {
            destinationLocation && (
              <Marker
                coordinate={destinationLocation}
                title="Destino"
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
      {openCardUser && <CardUser setUserSelect={userSelect} openCardUser={openCardUser} setOpenCardUser={setOpenCardUser}  />}
      {openListPeople && <ListPeople destinationLocation={destinationLocation} onClosePeople={handlePeopleClose} setLocal={setLocalDestination} />}
      {openListSchool && <ListSchool onCloseSchool={handleSchoolClose} setLocal={setLocalDestination} />}
      {openCardDriver && <CardDriver openCardDriver={openCardDriver} setOpenCardDriver={setOpenCardDriver} />}
      {openListAdress && <ListAdress setLocalTime={location} open={openListAdress} onCloseList={handleListClose} setLocal={setLocalOriginUser} />}
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