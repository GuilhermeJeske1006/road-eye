// App.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, FlatList, View } from 'react-native';

const Tste = () => {
  const [ws, setWs] = useState(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Endereço do servidor WebSocket
    const websocketUrl = 'ws://44.213.63.44:8081'; // Substitua pelo IP do seu servidor

    // Conectar ao servidor WebSocket
    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      websocket.send('Olá servidor!');
    };

    websocket.onmessage = (event) => {
      console.log(`Mensagem do servidor: ${event.data}`);
      setMessages(prevMessages => [...prevMessages, `Servidor: ${event.data}`]);
    };

    websocket.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };

    websocket.onclose = (event) => {
      console.log('Desconectado do servidor WebSocket', event);
      console.log(`Código de fechamento: ${event.code}, Motivo: ${event.reason}`);
    };

    setWs(websocket);

    // Limpar a conexão WebSocket ao desmontar o componente
    return () => {
      websocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(input);
      setMessages(prevMessages => [...prevMessages, `Você: ${input}`]);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite uma mensagem"
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
});

export default Tste;
