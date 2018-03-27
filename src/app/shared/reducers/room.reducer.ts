import {RoomModel} from "../models/room.model";

export const roomActions = {
  GET_REQUEST: 'room/GET_REQUEST',
  GET_SUCCESS: 'room/GET_SUCCESS',
  GET_ERROR: 'room/GET_ERROR',
};

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
