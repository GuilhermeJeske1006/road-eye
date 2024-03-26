import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CardMarker({}) {
    const [openCardMarker, setOpenCardMarker] = useState<boolean>(false);

    <View style={styles.card} >
    <TouchableOpacity onPress={() => { setOpenCardMarker(false) }} style={{ alignItems: 'flex-end' }} >
      <Icon name="close" size={20} color="#000" />
    </TouchableOpacity>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={{ uri: 'https://picsum.photos/id/237/200/300' }}
        style={{ width: 100, height: 100, borderRadius: 100, }}
      ></Image>

      <Text style={[styles.title, { textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }]}>12C2-ABC</Text>

    </View>

    <Text style={styles.title}>Motorista José Maria</Text>
    <Text style={styles.content}>Para SENAI</Text>

    <TouchableOpacity
      style={[styles.button, {
        marginTop: 20, flexDirection: 'row',
        alignItems: 'center',
      }]}
    >
      <Icon name="phone" size={20} color="#fff" />
      <Text style={styles.buttonText}>
        Ligar</Text>
    </TouchableOpacity>

  </View>
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 30,
        shadowColor: '#000',
        width: '80%',
        position: 'absolute',
        bottom: 20,
        zIndex: 100,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },

      buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "400",
        marginLeft: 10,
        alignItems: 'center',
        textAlign: 'center',
    
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2,
      },
      content: {
        fontSize: 16,
      },

      button: {
        alignItems: "center",
        textAlign: 'center',
        backgroundColor: "#BC1C2C",
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 20,
        color: "#fff",
    
      },
})