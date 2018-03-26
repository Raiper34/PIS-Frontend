import {ReservationModel} from "../models/reservation.model";

export const reservationListActions = {
  GET_REQUEST: 'reservationList/GET_REQUEST',
  GET_SUCCESS: 'reservationList/GET_SUCCESS',
  GET_ERROR: 'reservationList/GET_ERROR',
};

export function reservationListReducer(state: ReservationModel[] = [], action: any) {
  switch (action.type) {
    case reservationListActions.GET_SUCCESS:
      return action.payload;
    case reservationListActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
