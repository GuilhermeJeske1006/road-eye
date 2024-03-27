

import { Dispatch } from 'redux';
import { fetchCepRequest, fetchCepSuccess, fetchCepFailure, CepActionTypes } from '../Adress/actions';
import { Adress } from '../../Interfaces/adress';
import apiViaCep from '../../services/apiViaCep';


export const fetchCep = (cep: string): any => async (dispatch: Dispatch<CepActionTypes>) => {
    dispatch(fetchCepRequest());
  try {
    const response = await apiViaCep.get<Adress>(`${cep}/json/`);    
    dispatch(fetchCepSuccess(response.data));
  } catch (error) {
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
  }
};
