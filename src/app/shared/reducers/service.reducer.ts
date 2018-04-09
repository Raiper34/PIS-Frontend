import {ServiceModel} from "../models/service.model";

/*
 * Service Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const serviceActions = {
  GET_REQUEST: 'service/GET_REQUEST',
  GET_SUCCESS: 'service/GET_SUCCESS',
  GET_ERROR: 'service/GET_ERROR',
};

/**
 * Service Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {ServiceModel} state
 * @param action
 * @returns {any}
 */
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
