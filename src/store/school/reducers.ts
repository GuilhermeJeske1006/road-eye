// reducers.ts

import { Adress } from '../../Interfaces/adress';
import { Users } from '../../Interfaces/users';
import api from '../../services/api';
import { UserActionTypes, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from './actions';

interface UserState {
  data: Users | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export default userReducer;
