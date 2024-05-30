

import { Dispatch } from 'redux';
import { RouteActionTypes, fetchRouteFailure, fetchRouteRequest, fetchRouteSuccess } from './actions';
import api from '../../services/api';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStudentPeriod = (periodEnum: string, localDate: any): any => async (dispatch: Dispatch<RouteActionTypes>) => {
  dispatch(fetchRouteRequest());
  try {
    const response = await api.get(`/studentRoute/routeByPeriodAndDate?periodEnum=${periodEnum}&localDate=${localDate}`);
    dispatch(fetchRouteSuccess(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    showMessage({
      message: "Erro ao buscar dados!",
      type: "danger",
    });
    dispatch(fetchRouteFailure(error.message));
    console.log(error);
    throw error;
  }
}

export const putUpdateImage = (route_id: any, image: File): any => async (dispatch: Dispatch<RouteActionTypes>) => {
  dispatch(fetchRouteRequest());
  console.log(route_id, image);
  try {
    const formData = new FormData();
    formData.append('file', image);

    const response = await api.put(`/studentRoute/${route_id}/updateImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch(fetchRouteSuccess(response.data));
    console.log(response.data);
    showMessage({
      message: "Imagem enviada com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    console.log(error.message, 'erro');
    dispatch(fetchRouteFailure(error.message));
    showMessage({
      message: "Erro ao enviar a imagem! Tente novamente.",
      type: "danger",
    });
    throw error;
  }
};


export const postStudentPeriod = (data: any): any => async (dispatch: Dispatch<RouteActionTypes>) => {
  const userId = await AsyncStorage.getItem('user_id');
  dispatch(fetchRouteRequest());
  try {
    const response = await api.post(`/studentRoute/${userId}`, data);
    dispatch(fetchRouteSuccess(response.data));
    showMessage({
      message: "Dados enviados com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    showMessage({
      message: "Erro ao buscar dados!",
      type: "danger",
    });
    dispatch(fetchRouteFailure(error.message));
    console.log(error);
    throw error;
  }
}