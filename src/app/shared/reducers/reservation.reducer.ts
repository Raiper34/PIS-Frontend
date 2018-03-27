import {ReservationModel} from "../models/reservation.model";

export const reservationActions = {
  GET_REQUEST: 'reservation/GET_REQUEST',
  GET_SUCCESS: 'reservation/GET_SUCCESS',
  GET_ERROR: 'reservation/GET_ERROR',
};

export function reservationReducer(state: ReservationModel = null, action: any) {
  switch (action.type) {
    case reservationActions.GET_SUCCESS:
      return action.payload;
    case reservationActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
