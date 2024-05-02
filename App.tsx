import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import HomeScreen from "./src/screen/Home";
import ProfileScreen from "./src/screen/Profile";
import LoginScreen from "./src/screen/Login";
import { Provider } from "react-redux";
import store from "./src/store/store";
import 'react-native-reanimated';

const Drawer = createDrawerNavigator();


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

export default function App() {

  const isDriver = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const isUSer = useState<boolean>(true);

  const Login = (isAuth: boolean) => {
    setIsAuth(isAuth);
  }



  const handleLogout = () => {
    setIsAuth(false); 
  };

  return (
    <Provider store={store}>
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: '#F2F2F2' }}>
        {isAuth ? (
          <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeScreen} />
              <Drawer.Screen name="Perfil" component={ProfileScreen} />
            </Drawer.Navigator>
          </NavigationContainer>
        ) : (
          <LoginScreen onAuth={() => setIsAuth(true)} />
        )}
        {isAuth && (
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.text}>Sair</Text>
          </TouchableOpacity>
        )}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EDB047",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 40,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
})
