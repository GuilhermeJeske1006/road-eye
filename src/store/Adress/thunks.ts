

import { Dispatch } from 'redux';
import { fetchCepRequest, fetchCepSuccess, fetchCepFailure, CepActionTypes } from '../Adress/actions';
import { Adress } from '../../Interfaces/adress';
import apiViaCep from '../../services/apiViaCep';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';


export const fetchCep = (cep: string): any => async (dispatch: Dispatch<CepActionTypes>) => {
    dispatch(fetchCepRequest());
  try {
    const response = await apiViaCep.get<Adress>(`${cep}/json/`);    
    dispatch(fetchCepSuccess(response.data));
  } catch (error) {
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
    showMessage({
      message: "Erro ao buscar dados!",
      type: "danger",
    });
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
    showMessage({
      message: "Erro ao buscar dados!",
      type: "danger",
    });
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
    showMessage({
      message: "Endereço enviado com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    showMessage({
      message: "Erro ao enviar dados!",
      type: "danger",
    });
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
    throw error;
  }
}

export const putActiveAddress = (idAddress: any): any => async (dispatch: Dispatch<CepActionTypes>) => {
  console.log(idAddress, 'idAddress')
  dispatch(fetchCepRequest());
  try {
    const user_id = await AsyncStorage.getItem('user_id');
    const response = await api.put(`address/user/activateDisableAddress/${user_id}`, idAddress);
    dispatch(fetchCepSuccess(response.data));
    showMessage({
      message: "Endereço enviado com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    showMessage({
      message: "Erro ao enviar dados!",
      type: "danger",
    });
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
    throw error;
  }
}



