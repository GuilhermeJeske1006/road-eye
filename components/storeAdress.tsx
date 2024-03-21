import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function StoreAdress(props: { open: boolean, onClose: (isOpen: boolean) => void }) {
    const [cep, onChangeCep] = useState("");
    const [street, onChangeStreet] = useState("");
    const [neighborhood, onChangeNeighborhood] = useState("");
    const [city, onChangeCity] = useState("");
    const [state, onChangeState] = useState("");
    const [complement, onChangeComplement] = useState("");
    const [number, onChangeNumber] = useState("");
    const [openNewAdress, setOpenAdress] = useState<boolean>(false);

    useEffect(() => {
        setOpenAdress(props.open);
    }, [props.open]);

    async function handleSubmit() {
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

    const handleCloseModal = () => {
        props.onClose(false);
    };

    return (
        <View style={styles.adressContainer}>
            <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.cloneModal}
            >
                <Ionicons name="remove-outline" size={50} />
            </TouchableOpacity>
            <SafeAreaView style={{ marginBottom: 5 }}>
                <Text style={styles.titleAdress}>Adicione um novo endereço</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeCep}
                    placeholder="CEP"
                    value={cep}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Rua"
                    value={street}
                    onChangeText={onChangeStreet}
                />
                <TextInput
                    placeholder="Bairro"
                    style={styles.input}
                    onChangeText={onChangeNeighborhood}
                />
                <TextInput
                    placeholder="Cidade"
                    style={styles.input}
                    onChangeText={onChangeCity}
                />
                <TextInput
                    placeholder="Estado"
                    style={styles.input}
                    onChangeText={onChangeState}
                />
                <TextInput
                    placeholder="Complemento"
                    style={styles.input}
                    onChangeText={onChangeComplement}
                />
                <TextInput
                    placeholder="Numero"
                    style={styles.input}
                    onChangeText={onChangeNumber}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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