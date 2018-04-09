import {PersonModel} from "../models/person.model";

/*
 * Customer Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const customerActions = {
  GET_REQUEST: 'customer/GET_REQUEST',
  GET_SUCCESS: 'customer/GET_SUCCESS',
  GET_ERROR: 'customer/GET_ERROR',
};

/**
 * Customer Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {PersonModel} state
 * @param action
 * @returns {any}
 */
export function customerReducer(state: PersonModel = null, action: any) {
  switch (action.type) {
    case customerActions.GET_SUCCESS:
      return action.payload;
    case customerActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
