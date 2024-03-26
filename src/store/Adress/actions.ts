// actions.ts

import { Adress } from "../../Interfaces/adress";


export const FETCH_CEP_REQUEST = 'FETCH_CEP_REQUEST';
export const FETCH_CEP_SUCCESS = 'FETCH_CEP_SUCCESS';
export const FETCH_CEP_FAILURE = 'FETCH_CEP_FAILURE';

interface FetchCepRequestAction {
  type: typeof FETCH_CEP_REQUEST;
}

interface FetchCepSuccessAction {
  type: typeof FETCH_CEP_SUCCESS;
  payload: Adress;
}

interface FetchCepFailureAction {
  type: typeof FETCH_CEP_FAILURE;
  payload: string; // Mensagem de erro
}

export type CepActionTypes = FetchCepRequestAction | FetchCepSuccessAction | FetchCepFailureAction;

export const fetchCepRequest = (): FetchCepRequestAction => ({
  type: FETCH_CEP_REQUEST,
});

export const fetchCepSuccess = (data: Adress): FetchCepSuccessAction => ({
  type: FETCH_CEP_SUCCESS,
  payload: data,
});

export const fetchCepFailure = (error: string): FetchCepFailureAction => ({
  type: FETCH_CEP_FAILURE,
  payload: error,
});
