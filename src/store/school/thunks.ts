

import { Dispatch } from 'redux';
import { SchoolActionTypes, fetchSchoolFailure, fetchSchoolRequest, fetchSchoolSuccess } from './actions';
import api from '../../services/api';

export const getSchool = (): any => async (dispatch: Dispatch<SchoolActionTypes>) => {
  dispatch(fetchSchoolRequest());
  try {
    const response = await api.get('/school');
    dispatch(fetchSchoolSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchSchoolFailure('Erro ao buscar a escola.'));
    throw error;
  }
};
