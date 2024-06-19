import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://44.213.63.44:8080/roadeye/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
});

// Adiciona um interceptor para todas as requisições
api.interceptors.request.use(
  async (config) => {
    // Recupera o token do AsyncStorage
    const token = await AsyncStorage.getItem('auth_token');
    // Se o token existir, adiciona-o ao cabeçalho Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Se ocorrer um erro ao adicionar o token, apenas retorna o erro
    return Promise.reject(error);
  }
);

export default api;
