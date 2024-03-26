// reducers.ts

import { Adress } from '../../Interfaces/adress';
import { CepActionTypes, FETCH_CEP_REQUEST, FETCH_CEP_SUCCESS, FETCH_CEP_FAILURE } from './actions';

interface CepState {
  data: Adress | null;
  loading: boolean;
  error: string | null;
}

const initialState: CepState = {
  data: null,
  loading: false,
  error: null,
};

const cepReducer = (state = initialState, action: CepActionTypes): CepState => {
  switch (action.type) {
    case FETCH_CEP_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CEP_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_CEP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default cepReducer;
