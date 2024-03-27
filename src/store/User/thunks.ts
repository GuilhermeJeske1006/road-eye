

import { Dispatch } from 'redux';
import { UserActionTypes, fetchUserFailure, fetchUserRequest, fetchUserSuccess } from './actions';
import api from '../../services/api';


export const postLogin = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.post('/login', data);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
};

export const postForgot = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.post('/forgot', data);
    dispatch(fetchUserSuccess(response.data));
  }
  catch (error) {
    dispatch(fetchUserFailure('Erro ao enviar email'));
  }
}

export const postRegister = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.post('/register', data);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}

export const postLogout = (): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.post('/logout');
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}

export const postUpdate = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.put('/update', data);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}

export const putPassword = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.put('/update/password', data);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}

export const showUser = (id: any): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.get(`/user/${id}`);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}


