import {RoomModel} from "../models/room.model";

/*
 * Room List Reducer
 * Stateless container
 * @author: Filip Gulan
 * @mail: xgulan00@stud.fit.vutbr.cz
 * @date: 2018
 */
/**
 * Actions for dispatches
 * @type {{GET_REQUEST: string; GET_SUCCESS: string; GET_ERROR: string}}
 */
export const roomListActions = {
  GET_REQUEST: 'roomList/GET_REQUEST',
  GET_SUCCESS: 'roomList/GET_SUCCESS',
  GET_ERROR: 'roomList/GET_ERROR',
};

/**
 * Room List Reducer
 * Main reducer function, that catch dispatches and modify state
 * @param {RoomModel[]} state
 * @param action
 * @returns {any}
 */
export function roomListReducer(state: RoomModel[] = [], action: any) {
  switch (action.type) {
    case roomListActions.GET_SUCCESS:
      return action.payload;
    case roomListActions.GET_ERROR:
      return [];
    default:
      return state;
  }
}
