import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import App from "../../../App";




export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function submitLogin() {

    if (email === "" && senha === "") {
      return;
    }

    console.log(email, senha);
    //  setIsAuth(true);

    //  return HomeScreen;
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
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={text => setSenha(text)}
      />
      <TouchableOpacity
        onPress={submitLogin}
        style={[styles.button, { marginTop: 40 }]}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

}



const styles = StyleSheet.create({
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

