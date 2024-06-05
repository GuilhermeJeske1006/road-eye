import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchCep, postAddress } from "../store/Adress/thunks";
import { InputText } from "./geral/input-text";
import BtnPrimary from "./geral/btn-primary";
import TextError from "./geral/text-error";
import Loading from "./geral/loading";

const StoreAdress = (props: {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}) => {
  const [cep, onChangeCep] = useState("");
  const [street, onChangeStreet] = useState("");
  const [neighborhood, onChangeNeighborhood] = useState("");
  const [city, onChangeCity] = useState("");
  const [state, onChangeState] = useState("");
  const [complement, onChangeComplement] = useState("");
  const [number, onChangeNumber] = useState("");
  const [openNewAdress, setOpenAdress] = useState<boolean>(false);
  const dispatch = useDispatch();
  const adress = useSelector((state: any) => state.AdressReducer.data);
  const [error, setErrors] = useState<any | null>({
    erroCep: "",
    errorStreet: "",
    errorNeighborhood: "",
    errorCity: "",
    errorState: "",
    errorComplement: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (adress) {
      onChangeCep(adress.cep);
      onChangeStreet(adress.logradouro);
      onChangeNeighborhood(adress.bairro);
      onChangeCity(adress.localidade);
      onChangeState(adress.uf);
      onChangeComplement(adress.complemento);
    }
  }, [adress]);

  useEffect(() => {
    setOpenAdress(props.open);
  }, [props.open]);

  useEffect(() => {
    const cepPadrao = cep;

    if (cep?.length === 8) {
      dispatch(fetchCep(cep));

      onChangeCep(cepPadrao);
    }
  }, [cep]);

  const submitValidated = () => {
    const newErrors = {
      erroCep: cep === "" ? "O Campo cep obrigatório" : "",
      errorStreet: street === "" ? "O Campo Rua obrigatório" : "",
      errorNeighborhood:
        neighborhood === "" ? "O Campo bairro obrigatório" : "",
      errorCity: city === "" ? "O Campo cidade obrigatório" : "",
      errorState: state === "" ? "O Campo Estado obrigatório" : "",
      errorComplement: "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  async function handleSubmit() {
    if (submitValidated()) {
      const data = {
        postCode: cep,
        street: street,
        neighborhood: neighborhood,
        city: city,
        state: state,
        complement: complement,
        number: number,
        country: "Brasil",
        statusEnum: "ACTIVATE",
      };
      try {
        setLoading(true);
        await dispatch(postAddress(data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                nestedScrollEnabled
              >
                <Text style={styles.titleAdress}>
                  Adicione um novo endereço
                </Text>
                {error.erroCep && <TextError error={error.erroCep} />}
                <InputText
                  setFn={onChangeCep}
                  placeholder="CEP"
                  attribute={{ keyboardType: "numeric" }}
                  value={cep}
                />
                {error.errorStreet && <TextError error={error.errorStreet} />}
                <InputText
                  setFn={onChangeStreet}
                  placeholder="Rua"
                  value={street}
                />
                {error.errorNeighborhood && (
                  <TextError error={error.errorNeighborhood} />
                )}
                <InputText
                  setFn={onChangeNeighborhood}
                  placeholder="Bairro"
                  value={neighborhood}
                />
                {error.errorCity && <TextError error={error.errorCity} />}
                <InputText
                  setFn={onChangeCity}
                  placeholder="Cidade"
                  value={city}
                />
                {error.errorState && <TextError error={error.errorState} />}
                <InputText
                  setFn={onChangeState}
                  placeholder="Estado"
                  value={state}
                />
                {error.errorComplement && (
                  <TextError error={error.errorComplement} />
                )}
                <InputText
                  setFn={onChangeComplement}
                  placeholder="Complemento"
                  value={complement}
                />
                <InputText
                  setFn={onChangeNumber}
                  placeholder="Numero"
                  value={number}
                  attribute={{ keyboardType: "numeric" }}
                />
                <BtnPrimary fn={handleSubmit} text="Salvar" />
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  titleAdress: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default StoreAdress;
