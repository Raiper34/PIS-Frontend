import {PersonModel} from "../models/person.model";

/*
 * Employee List Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const employeeListActions = {
  GET_REQUEST: 'employeeList/GET_REQUEST',
  GET_SUCCESS: 'employeeList/GET_SUCCESS',
  GET_ERROR: 'employeeList/GET_ERROR',
};

/**
 * Employee List Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {PersonModel[]} state
 * @param action
 * @returns {any}
 */
export function employeeListReducer(state: PersonModel[] = [], action: any) {
  switch (action.type) {
    case employeeListActions.GET_SUCCESS:
      return action.payload;
    case employeeListActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
