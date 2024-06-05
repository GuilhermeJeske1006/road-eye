

import { Dispatch } from 'redux';
import { RouteActionTypes, fetchRouteFailure, fetchRouteRequest, fetchRouteSuccess } from './actions';
import api from '../../services/api';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getStudentPeriod = (periodEnum: string, localDate: any): any => async (dispatch: Dispatch<RouteActionTypes>) => {
  const studentStatusEnum = await AsyncStorage.getItem('return');
  const periodEnum = await AsyncStorage.getItem('period');

  dispatch(fetchRouteRequest());
  try {
    const response = await api.get(`/studentRoute/routeByPeriodAndDate?periodEnum=${periodEnum}&studentStatusEnum=${studentStatusEnum}&localDate=${localDate}`);
    dispatch(fetchRouteSuccess(response.data));
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

export const putUpdateImage = (route_id: string, image: any) => async (dispatch: Dispatch<any>) => {
  dispatch(fetchRouteRequest());
    const data = {
      imageUpdateRequest: image
    }

    await api.put(`studentRoute/${route_id}/updateImage`, data).then((res) =>{
      dispatch(fetchRouteSuccess(res?.data));
      showMessage({
        message: "Imagem enviada com sucesso!",
        type: "success",
      });
      return res?.data;
    }).catch((err) => {
      showMessage({
        message: "Erro ao enviar a imagem! Tente novamente.",
        type: "danger",
      });
      dispatch(fetchRouteFailure(err.message));
      throw err;
    }).finally(() => {
      const currentDate = new Date().toISOString().split('T')[0]
      dispatch(getStudentPeriod('', currentDate))
    })

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

