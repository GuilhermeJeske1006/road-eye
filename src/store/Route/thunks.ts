

import { Dispatch } from 'redux';
import { RouteActionTypes, fetchRouteFailure, fetchRouteRequest, fetchRouteSuccess } from './actions';
import api from '../../services/api';
import { showMessage } from 'react-native-flash-message';


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

export const putUpdateImage = (route_id: string, image: any): any => async (dispatch: Dispatch<RouteActionTypes>) => {
  dispatch(fetchRouteRequest());
  try {
    const response = await api.get(`/studentRoute/${route_id}updateImage`, image);
    dispatch(fetchRouteSuccess(response.data));
    console.log(response.data);
    showMessage({
      message: "Imagem enviada com sucesso!",
      type: "success",
    });
    return response.data;
  } catch (error) {
    dispatch(fetchRouteFailure(error.message));
    showMessage({
      message: "Erro ao enviar a imagem! Tente novamente.",
      type: "danger",
    });
    throw error;
  }
}
