

import { Dispatch } from 'redux';
import { UserActionTypes, fetchUserFailure, fetchUserRequest, fetchUserSuccess } from './actions';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

export const postLogin = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.post('/login', data);
    dispatch(fetchUserSuccess(response.data));
    await AsyncStorage.setItem('auth_token', response.data.accessToken);
    await AsyncStorage.setItem('user_id', response.data.userId);
    await AsyncStorage.setItem('roleEnum', response.data.roleEnum);
    showMessage({
      message: "Login feito com sucesso",
      type: "success",
    });
    return response.data;
  } catch (error) {
    showMessage({
      message: "Erro ao fazer o Login! Tente novamente.",
      type: "danger",
    });
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


export const postUpdate = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const user_id = await AsyncStorage.getItem('user_id');
    const response = await api.put(`/users/${user_id}`, data);
    dispatch(fetchUserSuccess(response.data));
    showMessage({
      message: "Usuario alterado com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    showMessage({
      message: "Erro ao tentar alterar usuario! Tente novamente.",
      type: "danger",
    });
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}

export const putPassword = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const user_id = await AsyncStorage.getItem('user_id');
    const response = await api.put(`/users/password/${user_id}`, data);
    dispatch(fetchUserSuccess(response.data));
    showMessage({
      message: "Senha alterada com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    showMessage({
      message: "Erro ao tentar alterar a senha! Tente novamente.",
      type: "danger",
    });
    dispatch(fetchUserFailure('Erro ao alterar senha.'));
  }
}

export const showUser = (id: any): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const response = await api.get(`/users/${id}`);
    dispatch(fetchUserSuccess(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    showMessage({
      message: "Erro ao carregar dados do usuario.",
      type: "danger",
    });
    dispatch(fetchUserFailure('Erro ao buscar o CEP.'));
  }
}


export const putTokenPush = (data: object): any => async (dispatch: Dispatch<UserActionTypes>) => {
  dispatch(fetchUserRequest());
  try {
    const user_id = await AsyncStorage.getItem('user_id');
    const response = await api.put(`/users/tokenPush/${user_id}`, data);
    dispatch(fetchUserSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchUserFailure('Erro ao alterar senha.'));
  }
}


