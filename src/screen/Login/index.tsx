import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  View,
} from "react-native";
import ForgotScreen from "../Forgot";


export default function LoginScreen(props: {onAuth: (isAuth: boolean) => void }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({
    emailRequired: "",
    passwordRequired: "",
  } as any);

  const [openForgot, setOpenForgot] = useState<boolean>(false);

  const validateLogin = () => {
    const newErrors = {
      emailRequired: email === '' ? 'Por favor, preencha o campo email' : '',
      passwordRequired: senha === '' ? 'Por favor, preencha o campo senha' : '',
    };
    setErrors(newErrors);
    return !newErrors.emailRequired && !newErrors.passwordRequired;
  };

  const submitLogin = () => {
    if (validateLogin()) {
      console.log(email, senha);
      props.onAuth(true);
    }
  };

  const onCloseForgot = (isOpen) => {
    setOpenForgot(false);
  };

  return (
    <View  style={{ flex: 1, margin: 30, justifyContent: "center" }}>
      {
        openForgot ? 
          <ForgotScreen  openForgot={openForgot}  onCloseForgot={onCloseForgot} email={email}/> :
          <KeyboardAvoidingView behavior="padding">
      
          <Image
            source={require('../../assets/logo.png')}
            style={[styles.image, { marginBottom: 40 }]}
          ></Image>
          {
            errors.emailRequired && <Text style={{ color: 'red' }}>{errors.emailRequired}</Text>
          }
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          {
            errors.passwordRequired && <Text style={{ color: 'red' }}>{errors.passwordRequired}</Text>
          }
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry
            onChangeText={text => setSenha(text)}
          />
              <TouchableOpacity 
              onPress={() => setOpenForgot(true)}
            >
            <Text style={[styles.buttonText, {marginLeft: 20, color: '#000'}]}>Esqueci minha senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={submitLogin}
            style={[styles.button, { marginTop: 30 }]}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      }
    </View>
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

