import {ServiceModel} from "../models/service.model";

export const serviceActions = {
  GET_REQUEST: 'service/GET_REQUEST',
  GET_SUCCESS: 'service/GET_SUCCESS',
  GET_ERROR: 'service/GET_ERROR',
};

export function serviceReducer(state: ServiceModel = null, action: any) {
  switch (action.type) {
    case serviceActions.GET_SUCCESS:
      return action.payload;
    case serviceActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
