import { SafeAreaView, ScrollView, ScrollViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCep } from "../../store/Adress/thunks";

export default function StoreAdress(props: { open: boolean, onClose: (isOpen: boolean) => void }) {
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
        erroCep: '',
        errorStreet: '',
        errorNeighborhood: '',
        errorCity: '',
        errorState: '',
        errorComplement: '',
    });

    useEffect(() => {
        if(adress){
            onChangeStreet(adress.logradouro);
            onChangeNeighborhood(adress.bairro);
            onChangeCity(adress.localidade);
            onChangeState(adress.uf);
            onChangeComplement(adress.complemento);
        }     
    }, [adress])

    
    useEffect(() => {
        setOpenAdress(props.open);
    }, [props.open]);
    

    const handleGetCep = (cep) => {
        onChangeCep(cep);
        dispatch(fetchCep(cep))
      };

      const submitValidated = () => {
        const newErrors = {
          erroCep: cep === "" ? "O Campo cep obrigatório" : "",
          errorStreet: street === "" ? "O Campo Rua obrigatório" : "",
          errorNeighborhood: neighborhood === "" ? "O Campo bairro obrigatório" : "",
          errorCity: city === "" ? "O Campo cidade obrigatório" : "",
          errorState: state === "" ? "O Campo Estado obrigatório" : "",
          errorComplement: "",
        };
      
        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== "");
      }
      
      async function handleSubmit() {
        if (submitValidated()) {
          const data = {
            cep,
            street,
            neighborhood,
            city,
            state,
            complement,
            number,
          };
          console.log(data);
        }
      }

    const handleCloseModal = () => {
        props.onClose(false);
    };

    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.adressContainer}>
            <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.cloneModal}
            >
                <Ionicons name="remove-outline" size={50} />
            </TouchableOpacity>
            <SafeAreaView style={{ marginBottom: 5 }}>
                <Text style={styles.titleAdress}>Adicione um novo endereço</Text>
                {
                    error.erroCep ? <Text style={{ color: "red" }}>{error.erroCep}</Text> : null
                }
                <TextInput
                    style={styles.input}
                    onChangeText={handleGetCep}
                    placeholder="CEP"
                    value={cep}
                    keyboardType="numeric"
                />
                {
                    error.errorStreet ? <Text style={{ color: "red" }}>{error.errorStreet}</Text> : null
                }
                <TextInput
                    style={styles.input}
                    placeholder="Rua"
                    value={street}
                    onChangeText={onChangeStreet}
                />
                {
                    error.errorNeighborhood ? <Text style={{ color: "red" }}>{error.errorNeighborhood}</Text> : null
                }
                <TextInput
                    placeholder="Bairro"
                    style={styles.input}
                    value={neighborhood}
                    onChangeText={onChangeNeighborhood}
                />
                {
                    error.errorCity ? <Text style={{ color: "red" }}>{error.errorCity}</Text> : null
                }
                <TextInput
                    placeholder="Cidade"
                    style={styles.input}
                    value={city}
                    onChangeText={onChangeCity}
                />
                {
                    error.errorState ? <Text style={{ color: "red" }}>{error.errorState}</Text> : null
                }
                <TextInput
                    placeholder="Estado"
                    value={state}
                    style={styles.input}
                    onChangeText={onChangeState}
                />
                {
                    error.errorComplement ? <Text style={{ color: "red" }}>{error.errorComplement}</Text> : null
                }
                <TextInput
                    placeholder="Complemento"
                    value={complement}
                    style={styles.input}
                    onChangeText={onChangeComplement}
                /> 
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    placeholder="Numero"
                    value={number}
                    keyboardType="numeric"
                />
            </SafeAreaView>

            <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, { marginTop: 10 }]}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
      },

    adressContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F2F2F2',
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    titleAdress: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },

    cloneModal: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        borderRadius: 20,
        marginBottom: 10,
        height: 55,
        margin: 5,
        paddingLeft: 20,
        // borderWidth: 0.3,
        fontFamily: 'sans-serif',
        fontSize: 15,
        padding: 15,
        // borderColor: "#3B566E",
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
});