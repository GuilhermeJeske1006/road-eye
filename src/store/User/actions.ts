import { Users } from "../../Interfaces/users";


export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST;
}

interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS;
  payload: Users;
}

interface FetchUserFailureAction {
  type: typeof FETCH_USER_FAILURE;
  payload: string; // Mensagem de erro
}

export type UserActionTypes = FetchUserRequestAction | FetchUserSuccessAction | FetchUserFailureAction;

export const fetchUserRequest = (): FetchUserRequestAction => ({
  type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (data: Users): FetchUserSuccessAction => ({
  type: FETCH_USER_SUCCESS,
  payload: data,
});

export const fetchUserFailure = (error: string): FetchUserFailureAction => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});
