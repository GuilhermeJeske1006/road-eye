import { Route } from "../../Interfaces/route";


export const FETCH_ROUTE_REQUEST = 'FETCH_ROUTE_REQUEST';
export const FETCH_ROUTE_SUCCESS = 'FETCH_ROUTE_SUCCESS';
export const FETCH_ROUTE_FAILURE = 'FETCH_ROUTE_FAILURE';

interface FetchRouteRequestAction {
  type: typeof FETCH_ROUTE_REQUEST;
}

interface FetchRouteSuccessAction {
  type: typeof FETCH_ROUTE_SUCCESS;
  payload: Route;
}

interface FetchRouteFailureAction {
  type: typeof FETCH_ROUTE_FAILURE;
  payload: string; // Mensagem de erro
}

export type RouteActionTypes = FetchRouteRequestAction | FetchRouteSuccessAction | FetchRouteFailureAction;

export const fetchRouteRequest = (): FetchRouteRequestAction => ({
  type: FETCH_ROUTE_REQUEST,
});

export const fetchRouteSuccess = (data: Route): FetchRouteSuccessAction => ({
  type: FETCH_ROUTE_SUCCESS,
  payload: data,
});

export const fetchRouteFailure = (error: string): FetchRouteFailureAction => ({
  type: FETCH_ROUTE_FAILURE,
  payload: error,
});
