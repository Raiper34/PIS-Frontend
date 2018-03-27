import {PersonModel} from "../models/person.model";

export const customerListActions = {
  GET_REQUEST: 'customerList/GET_REQUEST',
  GET_SUCCESS: 'customerList/GET_SUCCESS',
  GET_ERROR: 'customerList/GET_ERROR',
};

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
