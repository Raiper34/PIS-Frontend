import {PersonModel} from "../models/person.model";

/*
 * Employee Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const employeeActions = {
  GET_REQUEST: 'employee/GET_REQUEST',
  GET_SUCCESS: 'employee/GET_SUCCESS',
  GET_ERROR: 'employee/GET_ERROR',
};

/**
 * Employee Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {PersonModel} state
 * @param action
 * @returns {any}
 */
export function employeeReducer(state: PersonModel = null, action: any) {
  switch (action.type) {
    case employeeActions.GET_SUCCESS:
      return action.payload;
    case employeeActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
