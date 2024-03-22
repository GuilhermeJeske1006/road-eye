import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { NativeScreen } from "react-native-screens";

function ForgotScreen({navigation, route}) {
  return(
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, margin: 30, justifyContent: "center" }}>
      <Image
        source={require("../../assets/logo.png")}
        style={[styles.image, { marginBottom: 40 }]}
      ></Image>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Teste')}
        style={[styles.button, { marginTop: 30 }]}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}


export default function LoginScreen(props: {onAuth: (isAuth: boolean) => void }, {navigation}) {

  const [email, setEmail] = useState('d');
  const [senha, setSenha] = useState('d');

  function submitLogin() {

    if (email === "" && senha === "") {
      return;
    }
    console.log(email, senha);
    props.onAuth(true);
  }

  function goForgotPassword () {
    navigation.navigate('Forgot');
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, margin: 30, justifyContent: "center" }}>
      <Image
        source={require("../../assets/logo.png")}
        style={[styles.image, { marginBottom: 40 }]}
      ></Image>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        onChangeText={text => setSenha(text)}
      />

          <NativeScreen 
        >
        <Text style={[styles.buttonText, {marginLeft: 20, color: '#000'}]}>Esqueci minha senha?</Text>
      </NativeScreen>
      <TouchableOpacity
        onPress={submitLogin}
        style={[styles.button, { marginTop: 30 }]}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

}



const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    marginBottom: 10,
    height: 55,
    margin: 5,
    paddingLeft: 20,
    fontFamily: 'sans-serif',
    fontSize: 15,
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
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
})

