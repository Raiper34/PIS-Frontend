import {ReservationModel} from "../models/reservation.model";

/*
 * Reservation List Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const reservationListActions = {
  GET_REQUEST: 'reservationList/GET_REQUEST',
  GET_SUCCESS: 'reservationList/GET_SUCCESS',
  GET_ERROR: 'reservationList/GET_ERROR',
};

/**
 * Reservation List Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {ReservationModel[]} state
 * @param action
 * @returns {any}
 */
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
