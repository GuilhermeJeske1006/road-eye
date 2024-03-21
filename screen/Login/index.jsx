import { useState } from "react";
import {
    Button,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    View,
    KeyboardAvoidingView, 
    AppRegistry
  } from "react-native";
import App from "../../App";

const [email, setEmail] = useState<String>('');
const [senha, setSenha] = useState<String>('');

async function submitLogin() {
    
    if (email === "" && senha === "") {
      return;
    }

    console.log(email, senha);
    // setIsAuth(true);

    // return HomeScreen;
  }

  export default function LoginScreen() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, margin: 30, justifyContent: "center" }}>
        {/* <Image
          source={require("./assets/logo.png")}
          style={[styles.image, { marginBottom: 40 }]}
        ></Image> */}
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
  })

  AppRegistry.registerComponent('my-app', () => LoginScreen);
  AppRegistry.runApplication('my-app', { rootTag: document.getElementById('root') });

