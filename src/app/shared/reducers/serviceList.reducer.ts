import {ServiceModel} from "../models/service.model";

/*
 * Service List Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const serviceListActions = {
  GET_REQUEST: 'serviceList/GET_REQUEST',
  GET_SUCCESS: 'serviceList/GET_SUCCESS',
  GET_ERROR: 'serviceList/GET_ERROR',
};

/**
 * Service List Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {ServiceModel[]} state
 * @param action
 * @returns {any}
 */
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
