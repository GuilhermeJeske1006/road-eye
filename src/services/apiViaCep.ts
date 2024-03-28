
import axios from 'axios';

const BASE_URL = 'https://viacep.com.br/ws/';

const apiViaCep = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export default apiViaCep;
