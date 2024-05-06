

import { Dispatch } from 'redux';
import { fetchCepRequest, fetchCepSuccess, fetchCepFailure, CepActionTypes } from '../Adress/actions';
import { Adress } from '../../Interfaces/adress';
import apiViaCep from '../../services/apiViaCep';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchCep = (cep: string): any => async (dispatch: Dispatch<CepActionTypes>) => {
    dispatch(fetchCepRequest());
  try {
    const response = await apiViaCep.get<Adress>(`${cep}/json/`);    
    dispatch(fetchCepSuccess(response.data));
  } catch (error) {
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
  }
};


export const getAddress = (): any => async (dispatch: Dispatch<CepActionTypes>) => {
  dispatch(fetchCepRequest());
  try {
    const user_id = await AsyncStorage.getItem('user_id');
    const response = await api.get(`/address/users/${user_id}`);
    dispatch(fetchCepSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
    throw error;
  }
}

export const postAddress = (address: Object): any => async (dispatch: Dispatch<CepActionTypes>) => {
  dispatch(fetchCepRequest());
  try {
    const user_id = await AsyncStorage.getItem('user_id');
    const response = await api.post(`/address/user/${user_id}`, address);
    dispatch(fetchCepSuccess(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
    throw error;
  }
}


