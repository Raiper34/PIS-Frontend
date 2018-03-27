import {ServiceModel} from "../models/service.model";

export const serviceListActions = {
  GET_REQUEST: 'serviceList/GET_REQUEST',
  GET_SUCCESS: 'serviceList/GET_SUCCESS',
  GET_ERROR: 'serviceList/GET_ERROR',
};

export function serviceListReducer(state: ServiceModel[] = [], action: any) {
  switch (action.type) {
    case serviceListActions.GET_SUCCESS:
      return action.payload;
    case serviceListActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
