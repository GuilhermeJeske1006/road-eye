

import { Dispatch } from 'redux';
import { fetchCepRequest, fetchCepSuccess, fetchCepFailure, CepActionTypes } from '../Adress/actions';
import { Adress } from '../../Interfaces/adress';
import apiViaCep from '../../services/apiViaCep';
import api from '../../services/api';


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
    const response = await api.get('/address');
    dispatch(fetchCepSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
    throw error;
  }
}


