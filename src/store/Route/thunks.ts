

import { Dispatch } from 'redux';
import { RouteActionTypes, fetchRouteFailure, fetchRouteRequest, fetchRouteSuccess } from './actions';
import api from '../../services/api';


export const getStudentPeriod = (periodEnum: string, localDate: any): any => async (dispatch: Dispatch<RouteActionTypes>) => {
  dispatch(fetchRouteRequest());
  try {
    const response = await api.get(`/studentRoute/routeByPeriodAndDate?periodEnum=${periodEnum}&localDate=${localDate}`);
    dispatch(fetchRouteSuccess(response.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    dispatch(fetchRouteFailure(error.message));
    console.log(error);
    throw error;
  }
}
