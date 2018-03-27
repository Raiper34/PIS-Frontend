import {PersonModel} from "../models/person.model";

export const employeeActions = {
  GET_REQUEST: 'employee/GET_REQUEST',
  GET_SUCCESS: 'employee/GET_SUCCESS',
  GET_ERROR: 'employee/GET_ERROR',
};

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
