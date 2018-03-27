import {PersonModel} from "../models/person.model";

export const customerActions = {
  GET_REQUEST: 'customer/GET_REQUEST',
  GET_SUCCESS: 'customer/GET_SUCCESS',
  GET_ERROR: 'customer/GET_ERROR',
};

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
