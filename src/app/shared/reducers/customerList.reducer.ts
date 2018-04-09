import {PersonModel} from "../models/person.model";

/*
 * Customer List Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const customerListActions = {
  GET_REQUEST: 'customerList/GET_REQUEST',
  GET_SUCCESS: 'customerList/GET_SUCCESS',
  GET_ERROR: 'customerList/GET_ERROR',
};

/**
 * Customer List Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {PersonModel[]} state
 * @param action
 * @returns {any}
 */
export function customerListReducer(state: PersonModel[] = [], action: any) {
  switch (action.type) {
    case customerListActions.GET_SUCCESS:
      return action.payload;
    case customerListActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
