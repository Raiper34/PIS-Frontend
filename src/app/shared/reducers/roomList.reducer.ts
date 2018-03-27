import {RoomModel} from "../models/room.model";

export const roomListActions = {
  GET_REQUEST: 'roomList/GET_REQUEST',
  GET_SUCCESS: 'roomList/GET_SUCCESS',
  GET_ERROR: 'roomList/GET_ERROR',
};

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
