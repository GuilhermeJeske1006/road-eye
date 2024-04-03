

import { Dispatch } from 'redux';
import { UserActionTypes, fetchUserFailure, fetchUserRequest, fetchUserSuccess } from './actions';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postLogin = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.post('/login', data);
    dispatch(fetchUserSuccess(response.data));
    await AsyncStorage.setItem('auth_token', response.data.accessToken);

    return response.data;
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
    throw error;
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


export const postUpdate = (data: object, id: any): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.put(`/users/{${id}}`, data);
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
    const response = await api.get(`/users/${id}`);
    dispatch(fetchUserSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}


