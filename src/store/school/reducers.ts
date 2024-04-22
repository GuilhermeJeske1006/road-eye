// reducers.ts

import { Adress } from '../../Interfaces/adress';
import { School } from '../../Interfaces/school';
import api from '../../services/api';
import { SchoolActionTypes, FETCH_SCHOOL_REQUEST, FETCH_SCHOOL_SUCCESS, FETCH_SCHOOL_FAILURE } from './actions';

interface SchoolState {
  data: School | null;
  loading: boolean;
  error: string | null;
}

const initialState: SchoolState = {
  data: null,
  loading: false,
  error: null,
};

const SCHOOLReducer = (state = initialState, action: SchoolActionTypes): SchoolState => {
  switch (action.type) {
    case FETCH_SCHOOL_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SCHOOL_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_SCHOOL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default SCHOOLReducer;
