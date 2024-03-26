

import { Dispatch } from 'redux';
import { fetchCepRequest, fetchCepSuccess, fetchCepFailure, CepActionTypes } from '../Adress/actions';
import api from '../../services/api';
import { Adress } from '../../Interfaces/adress';


export const fetchCep = (cep: string): any => async (dispatch: Dispatch<CepActionTypes>) => {
    dispatch(fetchCepRequest());

  try {
    const response = await api.get<Adress>(`${cep}/json/`);
    dispatch(fetchCepSuccess(response.data));
  } catch (error) {
    dispatch(fetchCepFailure('Erro ao buscar o CEP.'));
  }
};
