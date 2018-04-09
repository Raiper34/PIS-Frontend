import {ReservationModel} from "../models/reservation.model";

/*
 * Reservation Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const reservationActions = {
  GET_REQUEST: 'reservation/GET_REQUEST',
  GET_SUCCESS: 'reservation/GET_SUCCESS',
  GET_ERROR: 'reservation/GET_ERROR',
};

/**
 * Reservation Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {ReservationModel} state
 * @param action
 * @returns {any}
 */
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
