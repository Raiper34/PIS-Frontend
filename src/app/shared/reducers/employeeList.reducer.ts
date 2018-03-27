import {PersonModel} from "../models/person.model";

export const employeeListActions = {
  GET_REQUEST: 'employeeList/GET_REQUEST',
  GET_SUCCESS: 'employeeList/GET_SUCCESS',
  GET_ERROR: 'employeeList/GET_ERROR',
};

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
