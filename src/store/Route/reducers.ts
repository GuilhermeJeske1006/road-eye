// reducers.ts

import { Adress } from '../../Interfaces/adress';
import { Route } from '../../Interfaces/route';
import api from '../../services/api';
import { RouteActionTypes, FETCH_ROUTE_REQUEST, FETCH_ROUTE_SUCCESS, FETCH_ROUTE_FAILURE } from './actions';

interface RouteState {
  data: Route | null;
  loading: boolean;
  error: string | null;
}

const initialState: RouteState = {
  data: null,
  loading: false,
  error: null,
};

const RouteReducer = (state = initialState, action: RouteActionTypes): RouteState => {
  switch (action.type) {
    case FETCH_ROUTE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ROUTE_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ROUTE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default RouteReducer;
