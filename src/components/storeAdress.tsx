import { SafeAreaView, ScrollView, ScrollViewComponent, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCep, postAddress } from "../store/Adress/thunks";
import { InputText } from "./geral/input-text";
import BtnPrimary from "./geral/btn-primary";
import TextError from "./geral/text-error";
import ModalComponent from "./geral/modal";

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
        if (adress) {
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
                postCode: cep,
                street: street,
                neighborhood: neighborhood,
                city: city,
                state: state,
                complement : complement,
                number: number,
                country: "Brasil",
                statusEnum: "ACTIVATE"

            };
            await dispatch(postAddress(data));
        }
    }

    const handleCloseModal = () => {
        props.onClose(false);
    };

    return (
        <ModalComponent handleCheckClose={handleCloseModal}>
             <ScrollView  style={{ marginBottom: 5 }}>
                <Text style={styles.titleAdress}>Adicione um novo endereço</Text>
                {error.erroCep && <TextError error={error.erroCep} />}
                <InputText
                    setFn={handleGetCep}
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
                {
                    error.errorNeighborhood && <TextError error={error.errorNeighborhood} />
                }
                <InputText
                    setFn={onChangeNeighborhood}
                    placeholder="Bairro"
                    value={neighborhood}
                />
                {
                    error.errorCity && <TextError error={error.errorCity} />
                }
                <InputText
                    setFn={onChangeCity}
                    placeholder="Cidade"
                    value={city}
                />
                {
                    error.errorState && <TextError error={error.errorState} />
                }
                <InputText
                    setFn={onChangeState}
                    placeholder="Estado"
                    value={state}
                />
                {
                    error.errorComplement && <TextError error={error.errorComplement} />
                }
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
            </ScrollView >

            <BtnPrimary fn={handleSubmit} text="Salvar" />
        </ModalComponent>
        
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

});