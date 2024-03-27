import React, { useState } from "react";
import {
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
import { useSelector } from "react-redux";

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
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const isUSer = useState<boolean>(true);

  const Login = (isAuth: boolean) => {
    setIsAuth(isAuth);
  }


  return (
    <Provider store={store}>

    <View style={{ flex: 1, justifyContent: "center", backgroundColor: '#F2F2F2' }}>
      {isAuth ? (
        <NavigationContainer theme={MyTheme}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}  />
            <Drawer.Screen name="Perfil" component={ProfileScreen}  />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen onAuth={Login} />
      )}
    </View>
    </Provider>
  );
}
