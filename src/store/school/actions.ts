import { Schools } from "../../Interfaces/school";


export const FETCH_SCHOOL_REQUEST = 'FETCH_SCHOOL_REQUEST';
export const FETCH_SCHOOL_SUCCESS = 'FETCH_SCHOOL_SUCCESS';
export const FETCH_SCHOOL_FAILURE = 'FETCH_SCHOOL_FAILURE';

interface FetchSchoolRequestAction {
  type: typeof FETCH_SCHOOL_REQUEST;
}

interface FetchSchoolSuccessAction {
  type: typeof FETCH_SCHOOL_SUCCESS;
  payload: Schools;
}

interface FetchSchoolFailureAction {
  type: typeof FETCH_SCHOOL_FAILURE;
  payload: string; // Mensagem de erro
}

export type SchoolActionTypes = FetchSchoolRequestAction | FetchSchoolSuccessAction | FetchSchoolFailureAction;

export const fetchSchoolRequest = (): FetchSchoolRequestAction => ({
  type: FETCH_SCHOOL_REQUEST,
});

export const fetchSchoolSuccess = (data: Schools): FetchSchoolSuccessAction => ({
  type: FETCH_SCHOOL_SUCCESS,
  payload: data,
});

export const fetchSchoolFailure = (error: string): FetchSchoolFailureAction => ({
  type: FETCH_SCHOOL_FAILURE,
  payload: error,
});
