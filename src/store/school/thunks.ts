

import { Dispatch } from 'redux';
import { SchoolActionTypes, fetchSchoolFailure, fetchSchoolRequest, fetchSchoolSuccess } from './actions';
import api from '../../services/api';
import { showMessage } from 'react-native-flash-message';


export const getSchool = (): any => async (dispatch: Dispatch<SchoolActionTypes>) => {
  dispatch(fetchSchoolRequest());
  try {
    const response = await api.get(`/address/school`);
    dispatch(fetchSchoolSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchSchoolFailure('Erro ao buscar o escola.'));
    showMessage({
      message: "Erro ao buscar dados!",
      type: "danger",
    });
    throw error;
  }
}
