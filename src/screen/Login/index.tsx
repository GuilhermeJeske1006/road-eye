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
import BtnPrimary from "../../components/geral/btn-primary";
import { InputText } from "../../components/geral/input-text";
import TextError from "../../components/geral/text-error";
import { useDispatch } from "react-redux";
import { postLogin } from "../../store/User/thunks";
import Loading from "../../components/geral/loading";

export default function LoginScreen(props: {
  onAuth: (isAuth: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errors, setErrors] = useState({
    emailRequired: "",
    passwordRequired: "",
  } as any);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [openForgot, setOpenForgot] = useState<boolean>(false);

  const validateLogin = () => {
    const newErrors = {
      emailRequired: email === "" ? "Por favor, preencha o campo email" : "",
      passwordRequired: senha === "" ? "Por favor, preencha o campo senha" : "",
    };
    setErrors(newErrors);
    return !newErrors.emailRequired && !newErrors.passwordRequired;
  };

  const submitLogin = async () => {
    if (validateLogin()) {
      const data = {
        login: email,
        password: senha,
      };

      try {
        setLoading(true);
        const res = await dispatch(postLogin(data));
        console.log("res", res);
        props.onAuth(true);
      } catch (err) {
        console.log("Erro ao fazer login:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const onCloseForgot = (isOpen) => {
    setOpenForgot(false);
  };

  return (
    <View style={{ flex: 1, margin: 30, justifyContent: "center" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {openForgot ? (
            <ForgotScreen
              openForgot={openForgot}
              onCloseForgot={onCloseForgot}
              email={email}
            />
          ) : (
            <KeyboardAvoidingView behavior="padding">
              <Image
                source={require("../../assets/logo.png")}
                style={[styles.image, { marginBottom: 40 }]}
              ></Image>
              {errors.emailRequired && (
                <TextError error={errors.emailRequired} />
              )}
              <InputText
                setFn={(text) => setEmail(text)}
                placeholder="Digite seu email"
                attribute={{ keyboardType: "email-address" }}
              />
              {errors.passwordRequired && (
                <TextError error={errors.passwordRequired} />
              )}
              <InputText
                setFn={(text) => setSenha(text)}
                placeholder="Digite sua senha"
                attribute={{ secureTextEntry: true }}
              />
              <TouchableOpacity onPress={() => setOpenForgot(true)}>
                {/* <Text style={[styles.buttonText, { marginLeft: 20, color: '#000' }]}>Esqueci minha senha?</Text> */}
              </TouchableOpacity>
              <BtnPrimary fn={submitLogin} text="Entrar" />
            </KeyboardAvoidingView>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
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
});
