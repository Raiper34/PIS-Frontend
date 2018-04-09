import {RoomModel} from "../models/room.model";

/*
 * Room Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const roomActions = {
  GET_REQUEST: 'room/GET_REQUEST',
  GET_SUCCESS: 'room/GET_SUCCESS',
  GET_ERROR: 'room/GET_ERROR',
};

/**
 * Room Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {RoomModel} state
 * @param action
 * @returns {any}
 */
export function roomReducer(state: RoomModel = null, action: any) {
  switch (action.type) {
    case roomActions.GET_SUCCESS:
      return action.payload;
    case roomActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
